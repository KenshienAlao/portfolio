import { NextResponse } from "next/server";
import { editItemAction, deleteItemAction } from "@/actions/setup";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ limit: 30, window: 60 });

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  try {
    const { id } = await params;
    const formData = await req.formData();
    const result = await editItemAction(parseInt(id), formData);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Failed to edit item",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const blocked = limiter(req);
  if (blocked) return blocked;
  try {
    const { id } = await params;
    const result = await deleteItemAction(parseInt(id));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Failed to delete item",
      },
      { status: 400 },
    );
  }
}
