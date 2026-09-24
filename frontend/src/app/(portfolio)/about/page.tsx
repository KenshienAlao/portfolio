import { About } from "@/views/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Kenshien Alao",
  description:
    "About Kenshien Alao — a web developer passionate about modern web applications, clean interfaces, and reliable backends.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}

