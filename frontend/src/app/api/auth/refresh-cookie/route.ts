import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 30, window: 60 });

export async function POST(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "No active session" }, { status: 401 });
  }
  return NextResponse.json({ success: true, message: "Session active" });
}
