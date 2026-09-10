import { NextResponse } from "next/server";
import { toggleMessageReadAction } from "@/actions/contact";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 30, window: 60 });

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  try {
    const { id } = await params;
    const result = await toggleMessageReadAction(parseInt(id));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Failed to toggle read",
      },
      { status: 400 },
    );
  }
}
