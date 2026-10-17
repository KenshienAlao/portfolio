import { Overview } from "@/components/dashboard/Overview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Kenshien Alao",
  description: "Overview dashboard for Kenshien Alao's portfolio.",
};

export default function DashboardPage() {
  return <Overview />;
}
