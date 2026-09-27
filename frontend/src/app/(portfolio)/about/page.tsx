import { About } from "@/views/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Kenshien Alao",
  description:
    "About Kenshien Alao — a web developer building fast, responsive websites, landing pages, and web applications.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}

