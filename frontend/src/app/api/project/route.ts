import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/db/projects";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 60, window: 60 });

export async function GET(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  const projects = await getAllProjects();
  return NextResponse.json({ success: true, data: projects });
}
