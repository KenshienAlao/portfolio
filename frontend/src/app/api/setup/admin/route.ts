import { NextResponse } from "next/server";
import { getAllSetupCategories } from "@/lib/db/setup";
import { requireAuth } from "@/lib/auth/session";

export async function GET() {
  try {
    await requireAuth();
    const categories = await getAllSetupCategories();
    return NextResponse.json({ success: true, data: categories });
  } catch {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
}
