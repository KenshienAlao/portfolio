import { MessagesTab } from "@/components/dashboard/MessagesTab";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Dashboard | Kenshien Alao",
  description: "View and manage incoming contact messages.",
};

export default function DashboardMessagesPage() {
  return <MessagesTab />;
}
