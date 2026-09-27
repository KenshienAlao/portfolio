import { Education } from "@/views/education";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education | Kenshien Alao",
  description:
    "Educational background and learning journey of Kenshien Alao — a web developer building modern web applications.",
  alternates: {
    canonical: "/education",
  },
};

export default function EducationPage() {
  return <Education />;
}