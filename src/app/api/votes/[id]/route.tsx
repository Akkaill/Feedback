import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
      include: { votes: true },
    });
    return NextResponse.json(user?.votes);
  } catch (error) {
    return NextResponse.json({ error: "User not found " });
  }
}
