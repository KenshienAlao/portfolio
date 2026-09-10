"use server";

import { verifyUserCredentials } from "@/lib/db/users";
import { setSession, clearSession } from "@/lib/auth/session";

export async function loginAction(data: { code: string; password: string }) {
  const { code, password } = data;
  if (!code || !password) {
    return { success: false, message: "Code and password are required." };
  }

  const user = await verifyUserCredentials(code, password);
  if (!user) {
    return { success: false, message: "Invalid code or password." };
  }

  await setSession(user.code);
  return { success: true, message: "Logged in successfully." };
}

export async function logoutAction() {
  await clearSession();
  return { success: true, message: "Logged out successfully." };
}
