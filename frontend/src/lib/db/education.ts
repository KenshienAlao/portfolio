import { readJsonFile, writeJsonFile } from "./json-store";

export interface Education {
  id: number;
  school: string;
  degree: string;
  yearStart: string;
  yearEnd: string;
  description: string;
  location: string;
}

const FILE = "education.json";

export async function getAllEducation(): Promise<Education[]> {
  return readJsonFile<Education[]>(FILE, []);
}

export async function getEducationById(id: number): Promise<Education | null> {
  const list = await getAllEducation();
  return list.find((e) => e.id === id) || null;
}

export async function createEducation(data: Omit<Education, "id">): Promise<Education> {
  const list = await getAllEducation();
  const newId = list.length > 0 ? Math.max(...list.map((e) => e.id)) + 1 : 1;
  const newEdu: Education = { ...data, id: newId };
  list.unshift(newEdu);
  await writeJsonFile(FILE, list);
  return newEdu;
}

export async function updateEducation(id: number, data: Partial<Omit<Education, "id">>): Promise<Education> {
  const list = await getAllEducation();
  const index = list.findIndex((e) => e.id === id);
  if (index === -1) {
    throw new Error(`Education with ID ${id} not found`);
  }

  const updated: Education = {
    ...list[index],
    ...data,
    id,
  };
  list[index] = updated;
  await writeJsonFile(FILE, list);
  return updated;
}

export async function deleteEducation(id: number): Promise<void> {
  const list = await getAllEducation();
  const filtered = list.filter((e) => e.id !== id);
  if (filtered.length === list.length) {
    throw new Error(`Education with ID ${id} not found`);
  }
  await writeJsonFile(FILE, filtered);
}
