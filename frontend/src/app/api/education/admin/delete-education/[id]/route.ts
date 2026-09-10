import { NextResponse } from "next/server";
import { deleteEducationAction } from "@/actions/education";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await deleteEducationAction(parseInt(id));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to delete education" },
      { status: 400 }
    );
  }
}
