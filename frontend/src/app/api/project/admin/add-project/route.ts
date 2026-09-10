import { NextResponse } from "next/server";
import { addProjectAction } from "@/actions/projects";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const result = await addProjectAction(formData);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to add project" },
      { status: 400 }
    );
  }
}
