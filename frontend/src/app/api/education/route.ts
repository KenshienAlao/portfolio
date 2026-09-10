import { NextResponse } from "next/server";
import { getAllEducation } from "@/lib/db/education";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 60, window: 60 });

export async function GET(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  const education = await getAllEducation();
  return NextResponse.json({ success: true, data: education });
}
