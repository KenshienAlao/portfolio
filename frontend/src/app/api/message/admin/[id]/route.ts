import { NextResponse } from "next/server";
import { deleteMessageAction } from "@/actions/contact";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await deleteMessageAction(parseInt(id));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to delete message" },
      { status: 400 }
    );
  }
}
