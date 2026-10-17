import { ProjectsTab } from "@/components/dashboard/ProjectsTab";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Dashboard | Kenshien Alao",
  description: "Manage portfolio projects.",
};

export default function DashboardProjectsPage() {
  return <ProjectsTab />;
}
