"use server";

import { createMessage, toggleMessageRead, deleteMessage } from "@/lib/db/messages";
import { requireAuth } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function submitContactMessage(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
    return { success: false, message: "Please fill in all required fields." };
  }

  // Basic email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email.trim())) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    const newMessage = await createMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject?.trim() || "No Subject",
      message: formData.message.trim(),
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Message sent successfully!", data: newMessage };
  } catch (error) {
    console.error("Error creating message:", error);
    return { success: false, message: "Failed to send message. Please try again." };
  }
}

export async function toggleMessageReadAction(id: number) {
  await requireAuth();
  const updated = await toggleMessageRead(id);
  revalidatePath("/dashboard");
  return { success: true, data: updated };
}

export async function deleteMessageAction(id: number) {
  await requireAuth();
  await deleteMessage(id);
  revalidatePath("/dashboard");
  return { success: true };
}
