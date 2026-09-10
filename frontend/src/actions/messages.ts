"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { toggleMessageRead, deleteMessage } from "@/lib/db/messages";

export async function toggleMessageReadAction(id: number) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const message = await toggleMessageRead(id);
  revalidatePath("/dashboard");
  return { success: true, data: message };
}

export async function deleteMessageAction(id: number) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await deleteMessage(id);
  revalidatePath("/dashboard");
  return { success: true };
}
