"use server";

import {
  createEducation,
  updateEducation,
  deleteEducation,
  Education,
} from "@/lib/db/education";
import { requireAuth } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function addEducationAction(
  data: Record<string, string | number>,
) {
  await requireAuth();

  const school = String(data.school || "").trim();
  const degree = String(data.degree || "").trim();
  const yearStart = String(data.yearStart || "").trim();
  const yearEnd = String(data.yearEnd || "").trim();
  const description = String(data.description || "").trim();
  const location = String(data.location || "").trim();

  if (!school || !degree || !yearStart || !yearEnd) {
    throw new Error("School, degree, and years are required");
  }

  const edu = await createEducation({
    school,
    degree,
    yearStart,
    yearEnd,
    description,
    location,
  });

  revalidatePath("/education");
  revalidatePath("/dashboard");
  return { success: true, data: edu };
}

export async function editEducationAction(
  id: number,
  data: Record<string, string | number>,
) {
  await requireAuth();

  const school = String(data.school || "").trim();
  const degree = String(data.degree || "").trim();
  const yearStart = String(data.yearStart || "").trim();
  const yearEnd = String(data.yearEnd || "").trim();
  const description = String(data.description || "").trim();
  const location = String(data.location || "").trim();

  const updates: Partial<Omit<Education, "id">> = {
    school,
    degree,
    yearStart,
    yearEnd,
    description,
    location,
  };

  const updated = await updateEducation(id, updates);

  revalidatePath("/education");
  revalidatePath("/dashboard");
  return { success: true, data: updated };
}

export async function deleteEducationAction(id: number) {
  await requireAuth();
  await deleteEducation(id);
  revalidatePath("/education");
  revalidatePath("/dashboard");
  return { success: true };
}
