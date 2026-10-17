import { SkillsTab } from "@/components/dashboard/SkillsTab";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Dashboard | Kenshien Alao",
  description: "Manage portfolio skills and technologies.",
};

export default function DashboardSkillsPage() {
  return <SkillsTab />;
}
