import { NextResponse } from "next/server";
import { getAllMessages } from "@/lib/db/messages";
import { requireAuth } from "@/lib/auth/session";

export async function GET() {
  try {
    await requireAuth();
    const messages = await getAllMessages();
    return NextResponse.json({ success: true, data: messages });
  } catch {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
}
