import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/db/projects";

export async function GET() {
  const projects = await getAllProjects();
  return NextResponse.json({ success: true, data: projects });
}
