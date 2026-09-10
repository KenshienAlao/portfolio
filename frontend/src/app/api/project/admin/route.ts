import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/db/projects";
import { requireAuth } from "@/lib/auth/session";

export async function GET() {
  try {
    await requireAuth();
    const projects = await getAllProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
}
