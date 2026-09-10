import { NextResponse } from "next/server";
import { getAllSetupCategories } from "@/lib/db/setup";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 60, window: 60 });

export async function GET(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  const categories = await getAllSetupCategories();
  return NextResponse.json({ success: true, data: categories });
}
