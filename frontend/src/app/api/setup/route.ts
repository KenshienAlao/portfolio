import { NextResponse } from "next/server";
import { getAllSetupCategories } from "@/lib/db/setup";

export async function GET() {
  const categories = await getAllSetupCategories();
  return NextResponse.json({ success: true, data: categories });
}
