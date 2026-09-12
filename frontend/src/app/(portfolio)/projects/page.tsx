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

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const projects = await getAllProjects();
  const sortOrder = sort === "oldest" ? "oldest" : "latest";

  return <Projects projects={projects} sort={sortOrder} />;
}
