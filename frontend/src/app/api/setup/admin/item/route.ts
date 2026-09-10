import { NextResponse } from "next/server";
import { addItemAction } from "@/actions/setup";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 30, window: 60 });

export async function POST(req: Request) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  try {
    const formData = await req.formData();
    const result = await addItemAction(formData);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Failed to add item",
      },
      { status: 400 },
    );
  }
}
