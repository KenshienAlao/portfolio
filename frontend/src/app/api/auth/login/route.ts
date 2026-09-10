import { NextResponse } from "next/server";
import { loginAction } from "@/actions/auth";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 10, window: 15 * 60 });

export async function POST(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  try {
    const body = await req.json();
    const result = await loginAction(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }
    return NextResponse.json({ success: true, message: result.message });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
