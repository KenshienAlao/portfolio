import { NextResponse } from "next/server";
import { submitContactMessage } from "@/actions/contact";

export async function POST(req: Request) {
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
