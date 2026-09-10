import { NextResponse } from "next/server";
import { getAllSkills } from "@/lib/db/skills";
import { requireAuth } from "@/lib/auth/session";

export async function GET() {
  try {
    await requireAuth();
    const skills = await getAllSkills();
    return NextResponse.json({ success: true, data: skills });
  } catch {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
}
