"use server";

import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  Skill,
} from "@/lib/db/skills";
import { requireAuth } from "@/lib/auth/session";
import { saveUploadedFile, removeUploadedFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";

export async function addSkillAction(formData: FormData) {
  await requireAuth();

  const name = (formData.get("name") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();

  let imageLight = "";
  const lightField = formData.get("imageLight");
  if (lightField instanceof File && lightField.size > 0) {
    imageLight = await saveUploadedFile(lightField, "skills");
  } else if (typeof lightField === "string" && lightField.trim()) {
    imageLight = lightField.trim();
  }

  let imageDark: string | undefined = undefined;
  const darkField = formData.get("imageDark");
  if (darkField instanceof File && darkField.size > 0) {
    imageDark = await saveUploadedFile(darkField, "skills");
  } else if (typeof darkField === "string" && darkField.trim()) {
    imageDark = darkField.trim();
  }

  if (!name || !category) {
    throw new Error("Name and category are required");
  }

  const skill = await createSkill({
    name,
    category,
    imageLight:
      imageLight ||
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    imageDark,
  });

  revalidatePath("/skills");
  revalidatePath("/dashboard");
  return { success: true, data: skill };
}

export async function editSkillAction(id: number, formData: FormData) {
  await requireAuth();

  const name = (formData.get("name") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();

  const updates: Partial<Omit<Skill, "id">> = {
    name,
    category,
  };

  const existing = (await getAllSkills()).find((s) => s.id === id);

  const lightField = formData.get("imageLight");
  if (lightField instanceof File && lightField.size > 0) {
    if (existing?.imageLight) {
      await removeUploadedFile(existing.imageLight);
    }
    updates.imageLight = await saveUploadedFile(lightField, "skills");
  } else if (
    typeof lightField === "string" &&
    lightField.trim() &&
    !lightField.startsWith("blob:")
  ) {
    updates.imageLight = lightField.trim();
  }

  const darkField = formData.get("imageDark");
  if (darkField instanceof File && darkField.size > 0) {
    if (existing?.imageDark) {
      await removeUploadedFile(existing.imageDark);
    }
    updates.imageDark = await saveUploadedFile(darkField, "skills");
  } else if (
    typeof darkField === "string" &&
    darkField.trim() &&
    !darkField.startsWith("blob:")
  ) {
    updates.imageDark = darkField.trim();
  }

  const updated = await updateSkill(id, updates);

  revalidatePath("/skills");
  revalidatePath("/dashboard");
  return { success: true, data: updated };
}

export async function deleteSkillAction(id: number) {
  await requireAuth();
  const existing = (await getAllSkills()).find((s) => s.id === id);
  if (existing?.imageLight) {
    await removeUploadedFile(existing.imageLight);
  }
  if (existing?.imageDark) {
    await removeUploadedFile(existing.imageDark);
  }
  await deleteSkill(id);
  revalidatePath("/skills");
  revalidatePath("/dashboard");
  return { success: true };
}
