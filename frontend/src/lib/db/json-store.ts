import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// In-memory queue per file path to guarantee serialized atomic writes
const writeQueues = new Map<string, Promise<unknown>>();

export async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error("Failed to create data directory:", error);
  }
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    if (!raw.trim()) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // File doesn't exist yet, write fallback value
      await writeJsonFile(filename, fallback);
      return fallback;
    }
    console.error(`[json-store] Error reading ${filename}:`, error);
    return fallback;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  const tempPath = path.join(DATA_DIR, `.${filename}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`);

  // Enqueue writes to avoid race conditions and file corruption
  const currentQueue = writeQueues.get(filename) || Promise.resolve();

  const writeOperation = currentQueue.then(async () => {
    const serialized = JSON.stringify(data, null, 2);
    await fs.writeFile(tempPath, serialized, "utf-8");
    await fs.rename(tempPath, filePath);
  }).catch(async (err) => {
    try {
      await fs.unlink(tempPath);
    } catch {
      // Ignore if temp file doesn't exist
    }
    console.error(`[json-store] Error writing ${filename}:`, err);
    throw err;
  });

  writeQueues.set(filename, writeOperation);
  return writeOperation as Promise<void>;
}
