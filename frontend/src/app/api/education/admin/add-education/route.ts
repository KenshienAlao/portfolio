import { NextResponse } from "next/server";
import { addEducationAction } from "@/actions/education";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 30, window: 60 });

export async function POST(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  try {
    const body = await req.json();
    const result = await addEducationAction(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Failed to add education",
      },
      { status: 400 },
    );
  }
}
