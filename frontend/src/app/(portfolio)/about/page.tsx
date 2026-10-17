import { About } from "@/views/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Kenshien Alao",
  description: "About Kenshien Alao — a backend developer.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
