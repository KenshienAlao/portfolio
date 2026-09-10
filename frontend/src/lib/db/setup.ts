import { readJsonFile, writeJsonFile } from "./json-store";

export interface SetupItem {
  id: number;
  categoryId?: number;
  value: string;
  download: string;
  imageLight: string;
  imageDark?: string;
  subValue?: string;
  subDownload?: string;
}

export interface SetupCategory {
  id: number;
  category: string;
  description: string;
  items: SetupItem[];
}

const FILE = "setup.json";

export async function getAllSetupCategories(): Promise<SetupCategory[]> {
  return readJsonFile<SetupCategory[]>(FILE, []);
}

export async function createCategory(data: { category: string; description: string }): Promise<SetupCategory> {
  const categories = await getAllSetupCategories();
  const newId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
  const newCat: SetupCategory = {
    id: newId,
    category: data.category,
    description: data.description,
    items: [],
  };
  categories.push(newCat);
  await writeJsonFile(FILE, categories);
  return newCat;
}

export async function updateCategory(id: number, data: { category: string; description: string }): Promise<SetupCategory> {
  const categories = await getAllSetupCategories();
  const cat = categories.find((c) => c.id === id);
  if (!cat) {
    throw new Error(`Category with ID ${id} not found`);
  }
  cat.category = data.category;
  cat.description = data.description;
  await writeJsonFile(FILE, categories);
  return cat;
}

export async function deleteCategory(id: number): Promise<void> {
  const categories = await getAllSetupCategories();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length === categories.length) {
    throw new Error(`Category with ID ${id} not found`);
  }
  await writeJsonFile(FILE, filtered);
}

export async function createItem(data: Omit<SetupItem, "id">): Promise<SetupItem> {
  const categories = await getAllSetupCategories();
  const cat = categories.find((c) => c.id === data.categoryId);
  if (!cat) {
    throw new Error(`Category with ID ${data.categoryId} not found`);
  }

  // Generate unique item ID across all categories
  let maxItemId = 0;
  for (const c of categories) {
    for (const it of c.items || []) {
      if (it.id > maxItemId) maxItemId = it.id;
    }
  }
  const newItemId = maxItemId + 1;

  const newItem: SetupItem = {
    ...data,
    id: newItemId,
  };

  cat.items = cat.items || [];
  cat.items.push(newItem);
  await writeJsonFile(FILE, categories);
  return newItem;
}

export async function updateItem(itemId: number, data: Partial<Omit<SetupItem, "id">>): Promise<SetupItem> {
  const categories = await getAllSetupCategories();
  let foundItem: SetupItem | null = null;

  for (const cat of categories) {
    const itemIndex = (cat.items || []).findIndex((it) => it.id === itemId);
    if (itemIndex !== -1) {
      const current = cat.items[itemIndex];
      // If categoryId changed, remove from old category and move to new
      if (data.categoryId && data.categoryId !== cat.id) {
        cat.items.splice(itemIndex, 1);
        const targetCat = categories.find((c) => c.id === data.categoryId);
        if (!targetCat) {
          throw new Error(`Target Category with ID ${data.categoryId} not found`);
        }
        targetCat.items = targetCat.items || [];
        foundItem = {
          ...current,
          ...data,
          id: itemId,
        };
        targetCat.items.push(foundItem);
      } else {
        foundItem = {
          ...current,
          ...data,
          id: itemId,
        };
        cat.items[itemIndex] = foundItem;
      }
      break;
    }
  }

  if (!foundItem) {
    throw new Error(`Setup item with ID ${itemId} not found`);
  }

  await writeJsonFile(FILE, categories);
  return foundItem;
}

export async function deleteItem(itemId: number): Promise<void> {
  const categories = await getAllSetupCategories();
  let deleted = false;

  for (const cat of categories) {
    const before = (cat.items || []).length;
    cat.items = (cat.items || []).filter((it) => it.id !== itemId);
    if (cat.items.length < before) {
      deleted = true;
      break;
    }
  }

  if (!deleted) {
    throw new Error(`Setup item with ID ${itemId} not found`);
  }

  await writeJsonFile(FILE, categories);
}
