import { Setup } from "@/views/setup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup | Kenshien Alao",
  description:
    "The tools Kenshien Alao uses for development, design, and productivity.",
  alternates: {
    canonical: "/setup",
  },
};

export default function SetupPage() {
  return <Setup />;
}