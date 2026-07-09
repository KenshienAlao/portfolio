import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { FramerProvider } from "@/components/framer-provider";

export const metadata: Metadata = { title: "Kenshien Portfolio" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <FramerProvider>{children}</FramerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
