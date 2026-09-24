import { useQuery } from "@tanstack/react-query";
import {
  projectService,
  type Project,
} from "@/service/project.service";
import { skillService, type Skill } from "@/service/skill.service";
import {
  educationService,
  type Education,
} from "@/service/education.service";
import {
  setupService,
  type SetupCategory,
} from "@/service/setup.service";

function usePortfolioQuery<T>(queryKey: string[], queryFn: () => Promise<T>) {
  return useQuery<T>({
    queryKey,
    queryFn,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useProjects() {
  return usePortfolioQuery(["project", "public"], async () => {
    const res = await projectService.getPublic();
    return res.data ?? [];
  });
}

export function useSkills() {
  return usePortfolioQuery(["skill", "public"], async () => {
    const res = await skillService.getPublic();
    return res.data ?? [];
  });
}

export function useEducation() {
  return usePortfolioQuery(["education", "public"], async () => {
    const res = await educationService.getPublic();
    return res.data ?? [];
  });
}

export function useSetupCategories() {
  return usePortfolioQuery(["setup", "public"], async () => {
    const res = await setupService.getPublic();
    return res.data ?? [];
  });
}

export type { Project };
export type { Skill };
export type { Education };
export type { SetupCategory };