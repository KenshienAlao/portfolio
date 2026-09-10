import { NextResponse } from "next/server";
import { getAllEducation } from "@/lib/db/education";
import { requireAuth } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 30, window: 60 });

export async function GET(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  try {
    await requireAuth();
    const education = await getAllEducation();
    return NextResponse.json({ success: true, data: education });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }
}
