import { Contact } from "@/views/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Kenshien Alao",
  description: "Get in touch with Kenshien Alao.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}
