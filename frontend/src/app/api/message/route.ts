import { NextResponse } from "next/server";
import { submitContactMessage } from "@/actions/contact";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 5, window: 60 * 60 });

export async function POST(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  try {
    const body = await req.json();
    const result = await submitContactMessage(body);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Failed to submit message",
      },
      { status: 500 },
    );
  }
}
