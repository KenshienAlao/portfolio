import { Skills } from "@/views/skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Kenshien Alao",
  description:
    "Tools and technologies Kenshien Alao works with across the stack.",
  alternates: {
    canonical: "/skills",
  },
};

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return <Skills selectedCategory={category} />;
}