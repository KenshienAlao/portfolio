import { Skills } from "@/views/skills";
import { getAllSkills } from "@/lib/db/skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Kenshien Alao",
  description:
    "Tools and technologies Kenshien Alao works with across the stack.",
  alternates: {
    canonical: "/skills",
  },
};

export default async function SkillsPage() {
  const skills = await getAllSkills();
  return <Skills skills={skills} />;
}
