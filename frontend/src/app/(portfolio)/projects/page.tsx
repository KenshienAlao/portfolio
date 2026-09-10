import { Projects } from "@/views/projects";
import { getAllProjects } from "@/lib/db/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Kenshien Alao",
  description:
    "Selected projects showcasing full-stack development, UI design, and problem solving by Kenshien Alao.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return <Projects projects={projects} />;
}
