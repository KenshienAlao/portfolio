"use client";

import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background text-text-primary">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col pb-16 md:pb-0 md:pl-16">
        <Navbar />

        <main className="flex-1 p-4 pb-10 sm:p-6 md:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
