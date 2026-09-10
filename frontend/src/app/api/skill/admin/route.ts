import { NextResponse } from "next/server";
import { getAllSkills } from "@/lib/db/skills";
import { requireAuth } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 30, window: 60 });

export async function GET(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  try {
    await requireAuth();
    const skills = await getAllSkills();
    return NextResponse.json({ success: true, data: skills });
  } catch {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
}
