"use client";

import { useState, useMemo } from "react";
import { ProjectModal } from "@/components/dashboard/modals/ProjectModal";
import {
  Project,
  useDeleteProjectById,
  useProjectAdmin,
} from "@/hooks/admin/use-project-admin";
import { DashboardProjectCardSkeleton } from "../ui/skeleton";
import { Header } from "./projectsTab/Projects-Header";
import { FetchError } from "./projectsTab/Projects-Error";
import { Empty } from "./projectsTab/Projects-Empty";
import { Content } from "./projectsTab/Projects-Content";

export function ProjectsTab() {
  const {
    data: projects,
    isPending: loadingProject,
    error: projectError,
    refetch: refetchProjects,
  } = useProjectAdmin();

  const {
    mutate: deleteProject,
    isPending: isDeletingProject,
    variables: deletingProjectId,
  } = useDeleteProjectById();

  const [projectForm, setProjectForm] = useState<Partial<Project> | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const hasProjects = (projects?.length ?? 0) > 0;

  const sortedProjects = useMemo(() => {
    if (!projects) return [];
    return [...projects].sort((a, b) => {
      const timeA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
      const timeB = b.addedAt ? new Date(b.addedAt).getTime() : 0;

      if (timeA && timeB && timeA !== timeB) {
        return sortOrder === "latest" ? timeB - timeA : timeA - timeB;
      }
      return sortOrder === "latest"
        ? (b.id ?? 0) - (a.id ?? 0)
        : (a.id ?? 0) - (b.id ?? 0);
    });
  }, [projects, sortOrder]);

  return (
    <div className="space-y-6">
      <Header
        projects={projects}
        hasProjects={hasProjects}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setProjectForm={setProjectForm}
      />

      {projectError ? (
        <FetchError
          projectError={projectError}
          refetchProjects={refetchProjects}
        />
      ) : loadingProject ? (
        <div
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          role="status"
          aria-busy="true"
          aria-label="Loading projects"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <DashboardProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : !hasProjects ? (
        <Empty setProjectForm={setProjectForm} />
      ) : (
        <Content
          projects={sortedProjects}
          isDeletingProject={isDeletingProject}
          deletingProjectId={deletingProjectId}
          confirmDeleteId={confirmDeleteId}
          setProjectForm={setProjectForm}
          setConfirmDeleteId={setConfirmDeleteId}
          deleteProject={deleteProject}
        />
      )}

      {projectForm !== null && (
        <ProjectModal
          projectForm={projectForm}
          projects={projects || []}
          setProjectForm={setProjectForm}
        />
      )}
    </div>
  );
}
