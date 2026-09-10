"use server";

import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  Project,
} from "@/lib/db/projects";
import { requireAuth } from "@/lib/auth/session";
import { saveUploadedFile, removeUploadedFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";

export async function addProjectAction(formData: FormData) {
  await requireAuth();

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const github = (formData.get("github") as string)?.trim() || "";
  const demo = (formData.get("demo") as string)?.trim() || null;
  const tagsRaw = (formData.get("tags") as string) || "";
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  let image = "";
  const imageField = formData.get("image");
  if (imageField instanceof File && imageField.size > 0) {
    image = await saveUploadedFile(imageField, "projects");
  } else if (typeof imageField === "string" && imageField.trim()) {
    image = imageField.trim();
  }

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  const project = await createProject({
    title,
    description,
    image:
      image ||
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    tags,
    github,
    demo,
  });

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/about");
  return { success: true, data: project };
}

export async function editProjectAction(id: number, formData: FormData) {
  await requireAuth();

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const github = (formData.get("github") as string)?.trim() || "";
  const demo = (formData.get("demo") as string)?.trim() || null;
  const tagsRaw = (formData.get("tags") as string) || "";
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const updates: Partial<Omit<Project, "id">> = {
    title,
    description,
    github,
    demo,
    tags,
  };

  const imageField = formData.get("image");
  if (imageField instanceof File && imageField.size > 0) {
    const existing = (await getAllProjects()).find((p) => p.id === id);
    if (existing?.image) {
      await removeUploadedFile(existing.image);
    }
    updates.image = await saveUploadedFile(imageField, "projects");
  } else if (
    typeof imageField === "string" &&
    imageField.trim() &&
    !imageField.startsWith("blob:")
  ) {
    updates.image = imageField.trim();
  }

  const updated = await updateProject(id, updates);

  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/about");
  return { success: true, data: updated };
}

export async function deleteProjectAction(id: number) {
  await requireAuth();
  const existing = (await getAllProjects()).find((p) => p.id === id);
  if (existing?.image) {
    await removeUploadedFile(existing.image);
  }
  await deleteProject(id);
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/about");
  return { success: true };
}
