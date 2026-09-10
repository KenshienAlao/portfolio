import { NextResponse } from "next/server";
import { deleteSkillAction } from "@/actions/skills";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await deleteSkillAction(parseInt(id));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to delete skill" },
      { status: 400 }
    );
  }
}
