import { verifyPassword } from "../auth/password";

export interface UserRecord {
  code: string;
}

export async function verifyUserCredentials(
  code: string,
  password: string
): Promise<UserRecord | null> {
  const adminCode = process.env.ADMIN_CODE?.trim();
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (!adminCode || !adminPasswordHash) {
    return null;
  }

  if (code.toLowerCase() !== adminCode.toLowerCase()) {
    return null;
  }

  const valid = await verifyPassword(password, adminPasswordHash);
  return valid ? { code: adminCode } : null;
}
