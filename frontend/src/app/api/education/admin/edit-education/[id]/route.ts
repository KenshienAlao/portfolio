import { NextResponse } from "next/server";
import { editEducationAction } from "@/actions/education";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = await editEducationAction(parseInt(id), body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to edit education" },
      { status: 400 }
    );
  }
}
