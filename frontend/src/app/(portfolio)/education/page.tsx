import { Education } from "@/views/education";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education | Kenshien Alao",
  description: "Educational background of Kenshien Alao — a backend developer.",
  alternates: {
    canonical: "/education",
  },
};

export default function EducationPage() {
  return <Education />;
}
