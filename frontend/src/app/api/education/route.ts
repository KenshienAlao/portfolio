import { NextResponse } from "next/server";
import { getAllEducation } from "@/lib/db/education";

export async function GET() {
  const education = await getAllEducation();
  return NextResponse.json({ success: true, data: education });
}
