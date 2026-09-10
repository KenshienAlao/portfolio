import { NextResponse } from "next/server";
import { addItemAction } from "@/actions/setup";

export async function POST(req: Request) {
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
