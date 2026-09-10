import { NextResponse } from "next/server";
import { addEducationAction } from "@/actions/education";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await addEducationAction(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to add education" },
      { status: 400 }
    );
  }
}
