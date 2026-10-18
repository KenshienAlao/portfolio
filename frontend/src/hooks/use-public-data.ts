import { useQuery } from "@tanstack/react-query";
import { projectService, type Project } from "@/service/project.service";
import { skillService, type Skill } from "@/service/skill.service";
import {
  educationService,
  type Education,
} from "@/service/education.service";

function usePortfolioQuery<T>(queryKey: string[], queryFn: () => Promise<T>) {
  return useQuery<T>({
    queryKey,
    queryFn,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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

export type { Project };
export type { Skill };
export type { Education };
