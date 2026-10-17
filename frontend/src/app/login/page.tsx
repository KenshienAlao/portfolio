import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { Login } from "@/views/login";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return <Login />;
}
