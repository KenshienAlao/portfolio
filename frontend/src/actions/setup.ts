"use server";

import {
  getAllSetupCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createItem,
  updateItem,
  deleteItem,
  SetupItem,
} from "@/lib/db/setup";
import { requireAuth } from "@/lib/auth/session";
import { saveUploadedFile, removeUploadedFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";

export async function addCategoryAction(data: {
  category: string;
  description: string;
}) {
  await requireAuth();
  const category = data.category?.trim();
  const description = data.description?.trim();

  if (!category) {
    throw new Error("Category name is required");
  }

  const newCat = await createCategory({
    category,
    description: description || "",
  });
  revalidatePath("/setup");
  revalidatePath("/dashboard");
  return { success: true, data: newCat };
}

export async function editCategoryAction(
  id: number,
  data: { category: string; description: string },
) {
  await requireAuth();
  const category = data.category?.trim();
  const description = data.description?.trim();

  if (!category) {
    throw new Error("Category name is required");
  }

  const updated = await updateCategory(id, {
    category,
    description: description || "",
  });
  revalidatePath("/setup");
  revalidatePath("/dashboard");
  return { success: true, data: updated };
}

export async function deleteCategoryAction(id: number) {
  await requireAuth();
  const categories = await getAllSetupCategories();
  const cat = categories.find((c) => c.id === id);
  if (cat && cat.items) {
    for (const item of cat.items) {
      if (item.imageLight) await removeUploadedFile(item.imageLight);
      if (item.imageDark) await removeUploadedFile(item.imageDark);
    }
  }
  await deleteCategory(id);
  revalidatePath("/setup");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function addItemAction(formData: FormData) {
  await requireAuth();

  const categoryId = parseInt(formData.get("categoryId") as string);
  const value = (formData.get("value") as string)?.trim();
  const download = (formData.get("download") as string)?.trim() || "";
  const subValue = (formData.get("subValue") as string)?.trim() || undefined;
  const subDownload =
    (formData.get("subDownload") as string)?.trim() || undefined;

  let imageLight = "";
  const lightField = formData.get("imageLight");
  if (lightField instanceof File && lightField.size > 0) {
    imageLight = await saveUploadedFile(lightField, "setup");
  } else if (typeof lightField === "string" && lightField.trim()) {
    imageLight = lightField.trim();
  }

  let imageDark: string | undefined = undefined;
  const darkField = formData.get("imageDark");
  if (darkField instanceof File && darkField.size > 0) {
    imageDark = await saveUploadedFile(darkField, "setup");
  } else if (typeof darkField === "string" && darkField.trim()) {
    imageDark = darkField.trim();
  }

  if (!value || isNaN(categoryId)) {
    throw new Error("Value and Category are required");
  }

  const item = await createItem({
    categoryId,
    value,
    download,
    imageLight,
    imageDark,
    subValue,
    subDownload,
  });

  revalidatePath("/setup");
  revalidatePath("/dashboard");
  return { success: true, data: item };
}

export async function editItemAction(itemId: number, formData: FormData) {
  await requireAuth();

  const categoryIdRaw = formData.get("categoryId");
  const categoryId = categoryIdRaw
    ? parseInt(categoryIdRaw as string)
    : undefined;
  const value = (formData.get("value") as string)?.trim();
  const download = (formData.get("download") as string)?.trim();
  const subValue = (formData.get("subValue") as string)?.trim();
  const subDownload = (formData.get("subDownload") as string)?.trim();

  const updates: Partial<Omit<SetupItem, "id">> = {};
  if (value !== undefined) updates.value = value;
  if (download !== undefined) updates.download = download;
  if (subValue !== undefined) updates.subValue = subValue;
  if (subDownload !== undefined) updates.subDownload = subDownload;
  if (categoryId !== undefined && !isNaN(categoryId))
    updates.categoryId = categoryId;

  const categories = await getAllSetupCategories();
  let existingItem: SetupItem | undefined;
  for (const c of categories) {
    const it = c.items?.find((i) => i.id === itemId);
    if (it) {
      existingItem = it;
      break;
    }
  }

  const lightField = formData.get("imageLight");
  if (lightField instanceof File && lightField.size > 0) {
    if (existingItem?.imageLight) {
      await removeUploadedFile(existingItem.imageLight);
    }
    updates.imageLight = await saveUploadedFile(lightField, "setup");
  } else if (
    typeof lightField === "string" &&
    lightField.trim() &&
    !lightField.startsWith("blob:")
  ) {
    updates.imageLight = lightField.trim();
  }

  const darkField = formData.get("imageDark");
  if (darkField instanceof File && darkField.size > 0) {
    if (existingItem?.imageDark) {
      await removeUploadedFile(existingItem.imageDark);
    }
    updates.imageDark = await saveUploadedFile(darkField, "setup");
  } else if (
    typeof darkField === "string" &&
    darkField.trim() &&
    !darkField.startsWith("blob:")
  ) {
    updates.imageDark = darkField.trim();
  }

  const updated = await updateItem(itemId, updates);

  revalidatePath("/setup");
  revalidatePath("/dashboard");
  return { success: true, data: updated };
}

export async function deleteItemAction(itemId: number) {
  await requireAuth();
  const categories = await getAllSetupCategories();
  for (const c of categories) {
    const it = c.items?.find((i) => i.id === itemId);
    if (it) {
      if (it.imageLight) await removeUploadedFile(it.imageLight);
      if (it.imageDark) await removeUploadedFile(it.imageDark);
      break;
    }
  }
  await deleteItem(itemId);
  revalidatePath("/setup");
  revalidatePath("/dashboard");
  return { success: true };
}
