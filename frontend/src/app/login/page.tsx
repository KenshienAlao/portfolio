import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { QueryProvider } from "@/provider/query-provider";
import { Login } from "@/views/login";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <QueryProvider>
      <Login />
    </QueryProvider>
  );
}
