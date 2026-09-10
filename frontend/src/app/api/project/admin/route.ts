import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/db/projects";
import { requireAuth } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 30, window: 60 });

export async function GET(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  try {
    await requireAuth();
    const projects = await getAllProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
}
