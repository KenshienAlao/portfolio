import { Education } from "@/views/education";
import { getAllEducation } from "@/lib/db/education";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education | Kenshien Alao",
  description:
    "Academic journey and milestones that shaped Kenshien Alao's path in technology.",
  alternates: {
    canonical: "/education",
  },
};

export const dynamic = "force-dynamic";

export default async function EducationPage() {
  const education = await getAllEducation();
  return <Education education={education} />;
}
