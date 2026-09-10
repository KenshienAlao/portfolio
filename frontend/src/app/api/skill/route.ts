import { NextResponse } from "next/server";
import { getAllSkills } from "@/lib/db/skills";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 60, window: 60 });

export async function GET(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  const skills = await getAllSkills();
  return NextResponse.json({ success: true, data: skills });
}
