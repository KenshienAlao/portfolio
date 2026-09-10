import fs from "fs/promises";
import path from "path";

const BUNDLED_DATA_DIR = path.join(process.cwd(), "data");
const IS_SERVERLESS = Boolean(
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME,
);
const WRITABLE_DATA_DIR = IS_SERVERLESS
  ? path.join("/tmp", "portfolio_data")
  : BUNDLED_DATA_DIR;

const writeQueues = new Map<string, Promise<unknown>>();

export async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(WRITABLE_DATA_DIR, { recursive: true });
  } catch {}
}

export async function readJsonFile<T>(
  filename: string,
  fallback: T,
): Promise<T> {
  if (WRITABLE_DATA_DIR !== BUNDLED_DATA_DIR) {
    const tmpFilePath = path.join(WRITABLE_DATA_DIR, filename);
    try {
      const raw = await fs.readFile(tmpFilePath, "utf-8");
      if (raw.trim()) {
        return JSON.parse(raw) as T;
      }
    } catch {}
  }

  const bundledFilePath = path.join(BUNDLED_DATA_DIR, filename);
  try {
    const raw = await fs.readFile(bundledFilePath, "utf-8");
    if (!raw.trim()) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    // DO NOT try to write fallback on read - this causes EROFS on read-only filesystems like Vercel!
    return fallback;
  }
}

export async function writeJsonFile<T>(
  filename: string,
  data: T,
): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(WRITABLE_DATA_DIR, filename);
  const tempPath = path.join(
    WRITABLE_DATA_DIR,
    `.${filename}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`,
  );

  // Enqueue writes to avoid race conditions and file corruption
  const currentQueue = writeQueues.get(filename) || Promise.resolve();

  const writeOperation = currentQueue.then(async () => {
    const serialized = JSON.stringify(data, null, 2);
    try {
      await fs.writeFile(tempPath, serialized, "utf-8");
      await fs.rename(tempPath, filePath);
    } catch (err) {
      try {
        await fs.unlink(tempPath);
      } catch {
        // Ignore if temp file doesn't exist
      }
      console.error(`[json-store] Error writing ${filename}:`, err);
      throw err;
    }
  });

  writeQueues.set(filename, writeOperation);
  return writeOperation as Promise<void>;
}
