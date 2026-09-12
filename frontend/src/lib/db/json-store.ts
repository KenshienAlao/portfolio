import fs from "fs/promises";
import path from "path";
import { redis, isRedisConfigured } from "./redis";

const BUNDLED_DATA_DIR = path.join(process.cwd(), "data");
const IS_SERVERLESS = Boolean(
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME,
);
const WRITABLE_DATA_DIR = IS_SERVERLESS
  ? path.join("/tmp", "portfolio_data")
  : BUNDLED_DATA_DIR;

const writeQueues = new Map<string, Promise<unknown>>();

function getRedisKey(filename: string): string {
  const baseName = filename.replace(/\.json$/, "");
  return `portfolio:${baseName}`;
}

export async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(WRITABLE_DATA_DIR, { recursive: true });
  } catch {}
}

async function readBundledFile<T>(filename: string, fallback: T): Promise<T> {
  const bundledFilePath = path.join(BUNDLED_DATA_DIR, filename);
  try {
    const raw = await fs.readFile(bundledFilePath, "utf-8");
    if (!raw.trim()) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function readJsonFile<T>(
  filename: string,
  fallback: T,
): Promise<T> {
  if (isRedisConfigured && redis) {
    try {
      const key = getRedisKey(filename);
      const data = await redis.get<T>(key);
      if (data !== null && data !== undefined) {
        return data;
      }

      const initialData = await readBundledFile<T>(filename, fallback);
      try {
        await redis.set(key, initialData);
      } catch (seedError) {
        console.warn(
          `[json-store] Failed to auto-seed ${key} in Redis:`,
          seedError,
        );
      }
      return initialData;
    } catch (err) {
      console.error(
        `[json-store] Redis read failed for ${filename}, falling back to file:`,
        err,
      );
    }
  }

  if (WRITABLE_DATA_DIR !== BUNDLED_DATA_DIR) {
    const tmpFilePath = path.join(WRITABLE_DATA_DIR, filename);
    try {
      const raw = await fs.readFile(tmpFilePath, "utf-8");
      if (raw.trim()) {
        return JSON.parse(raw) as T;
      }
    } catch {}
  }

  return readBundledFile<T>(filename, fallback);
}

export async function writeJsonFile<T>(
  filename: string,
  data: T,
): Promise<void> {
  if (isRedisConfigured && redis) {
    const key = getRedisKey(filename);
    try {
      await redis.set(key, data);
    } catch (err) {
      console.error(`[json-store] Redis write failed for ${filename}:`, err);
      throw err;
    }

    if (!IS_SERVERLESS) {
      try {
        await writeLocalFile(filename, data);
      } catch {}
    }
    return;
  }
  await writeLocalFile(filename, data);
}

async function writeLocalFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(WRITABLE_DATA_DIR, filename);
  const tempPath = path.join(
    WRITABLE_DATA_DIR,
    `.${filename}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`,
  );

  const currentQueue = writeQueues.get(filename) || Promise.resolve();

  const writeOperation = currentQueue.then(async () => {
    const serialized = JSON.stringify(data, null, 2);
    try {
      await fs.writeFile(tempPath, serialized, "utf-8");
      await fs.rename(tempPath, filePath);
    } catch (err) {
      try {
        await fs.unlink(tempPath);
      } catch {}
      console.error(`[json-store] Error writing ${filename}:`, err);
      throw err;
    }
  });

  writeQueues.set(filename, writeOperation);
  return writeOperation as Promise<void>;
}
