import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "No active session" }, { status: 401 });
  }
  return NextResponse.json({ success: true, message: "Session active" });
}
