import { NextResponse } from "next/server";
import { addCategoryAction } from "@/actions/setup";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await addCategoryAction(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Failed to add category",
      },
      { status: 400 },
    );
  }
}
