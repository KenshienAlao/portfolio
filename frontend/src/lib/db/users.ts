import { readJsonFile, writeJsonFile } from "./json-store";
import { verifyPassword, hashPassword } from "../auth/password";

export interface UserRecord {
  id: number;
  code: string;
  passwordHash: string;
}

const FILE = "users.json";

export async function getAllUsers(): Promise<UserRecord[]> {
  return readJsonFile<UserRecord[]>(FILE, []);
}

export async function findUserByCode(code: string): Promise<UserRecord | null> {
  const users = await getAllUsers();
  return users.find((u) => u.code.toLowerCase() === code.toLowerCase()) || null;
}

export async function verifyUserCredentials(
  code: string,
  password: string,
): Promise<UserRecord | null> {
  const user = await findUserByCode(code);
  if (!user) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  return valid ? user : null;
}

export async function createUser(
  code: string,
  password: string,
): Promise<UserRecord> {
  const users = await getAllUsers();
  if (users.some((u) => u.code.toLowerCase() === code.toLowerCase())) {
    throw new Error("User already exists");
  }

  const passwordHash = await hashPassword(password);
  const newUser: UserRecord = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    code,
    passwordHash,
  };

  users.push(newUser);
  await writeJsonFile(FILE, users);
  return newUser;
}
