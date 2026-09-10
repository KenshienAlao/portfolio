import { NextResponse } from "next/server";
import { toggleMessageReadAction } from "@/actions/contact";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await toggleMessageReadAction(parseInt(id));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to toggle read" },
      { status: 400 }
    );
  }
}
