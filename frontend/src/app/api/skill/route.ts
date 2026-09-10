import { NextResponse } from "next/server";
import { getAllSkills } from "@/lib/db/skills";

export async function GET() {
  const skills = await getAllSkills();
  return NextResponse.json({ success: true, data: skills });
}
