import { Setup } from "@/views/setup";
import { getAllSetupCategories } from "@/lib/db/setup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup | Kenshien Alao",
  description:
    "The tools Kenshien Alao uses for development, design, and productivity.",
  alternates: {
    canonical: "/setup",
  },
};

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const setups = await getAllSetupCategories();
  return <Setup setups={setups} />;
}

