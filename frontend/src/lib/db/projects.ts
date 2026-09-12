import { readJsonFile, writeJsonFile } from "./json-store";

export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  github: string;
  demo: string | null;
  addedAt?: string;
}

const FILE = "projects.json";

export async function getAllProjects(): Promise<Project[]> {
  const projects = await readJsonFile<Project[]>(FILE, []);
  return projects.sort((a, b) => {
    if (a.addedAt && b.addedAt) {
      const timeA = new Date(a.addedAt).getTime();
      const timeB = new Date(b.addedAt).getTime();
      if (!isNaN(timeA) && !isNaN(timeB) && timeB !== timeA) {
        return timeB - timeA;
      }
    }
    return (b.id ?? 0) - (a.id ?? 0);
  });
}

export async function getProjectById(id: number): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.id === id) || null;
}

export async function createProject(
  data: Omit<Project, "id">,
): Promise<Project> {
  const projects = await getAllProjects();
  const newId =
    projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
  const newProject: Project = {
    ...data,
    id: newId,
    addedAt: data.addedAt || new Date().toISOString(),
  };
  projects.unshift(newProject);
  await writeJsonFile(FILE, projects);
  return newProject;
}

export async function updateProject(
  id: number,
  data: Partial<Omit<Project, "id">>,
): Promise<Project> {
  const projects = await getAllProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Project with ID ${id} not found`);
  }

  const updated: Project = {
    ...projects[index],
    ...data,
    id,
  };
  projects[index] = updated;
  await writeJsonFile(FILE, projects);
  return updated;
}

export async function deleteProject(id: number): Promise<void> {
  const projects = await getAllProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) {
    throw new Error(`Project with ID ${id} not found`);
  }
  await writeJsonFile(FILE, filtered);
}
