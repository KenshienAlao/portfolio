import { EducationTab } from "@/components/dashboard/EducationTab";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education | Dashboard | Kenshien Alao",
  description: "Manage portfolio education entries.",
};

export default function DashboardEducationPage() {
  return <EducationTab />;
}
