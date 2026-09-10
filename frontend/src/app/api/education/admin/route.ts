import { NextResponse } from "next/server";
import { getAllEducation } from "@/lib/db/education";
import { requireAuth } from "@/lib/auth/session";

export async function GET() {
  try {
    await requireAuth();
    const education = await getAllEducation();
    return NextResponse.json({ success: true, data: education });
  } catch {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
}
