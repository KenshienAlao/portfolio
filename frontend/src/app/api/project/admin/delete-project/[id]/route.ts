import { NextResponse } from "next/server";
import { deleteProjectAction } from "@/actions/projects";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await deleteProjectAction(parseInt(id));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to delete project" },
      { status: 400 }
    );
  }
}
