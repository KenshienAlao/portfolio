import { Education } from "@/views/education";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education | Kenshien Alao",
  description:
    "Academic journey and milestones that shaped Kenshien Alao's path in technology.",
  alternates: {
    canonical: "/education",
  },
};

export default function EducationPage() {
  return <Education />;
}