import { readJsonFile, writeJsonFile } from "./json-store";

export interface Skill {
  id: number;
  name: string;
  category: string;
  imageLight: string;
  imageDark?: string;
}

const FILE = "skills.json";

export async function getAllSkills(): Promise<Skill[]> {
  return readJsonFile<Skill[]>(FILE, []);
}

export async function getSkillById(id: number): Promise<Skill | null> {
  const skills = await getAllSkills();
  return skills.find((s) => s.id === id) || null;
}

export async function createSkill(data: Omit<Skill, "id">): Promise<Skill> {
  const skills = await getAllSkills();
  const newId = skills.length > 0 ? Math.max(...skills.map((s) => s.id)) + 1 : 1;
  const newSkill: Skill = { ...data, id: newId };
  skills.push(newSkill);
  await writeJsonFile(FILE, skills);
  return newSkill;
}

export async function updateSkill(id: number, data: Partial<Omit<Skill, "id">>): Promise<Skill> {
  const skills = await getAllSkills();
  const index = skills.findIndex((s) => s.id === id);
  if (index === -1) {
    throw new Error(`Skill with ID ${id} not found`);
  }

  const updated: Skill = {
    ...skills[index],
    ...data,
    id,
  };
  skills[index] = updated;
  await writeJsonFile(FILE, skills);
  return updated;
}

export async function deleteSkill(id: number): Promise<void> {
  const skills = await getAllSkills();
  const filtered = skills.filter((s) => s.id !== id);
  if (filtered.length === skills.length) {
    throw new Error(`Skill with ID ${id} not found`);
  }
  await writeJsonFile(FILE, filtered);
}
