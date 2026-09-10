import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { QueryProvider } from "@/provider/query-provider";
import { DashboardView } from "@/views/dashboard";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <QueryProvider>
      <DashboardView />
    </QueryProvider>
  );
}
