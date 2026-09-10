import { NextResponse } from "next/server";
import { editProjectAction } from "@/actions/projects";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const formData = await req.formData();
    const result = await editProjectAction(parseInt(id), formData);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to edit project" },
      { status: 400 }
    );
  }
}
