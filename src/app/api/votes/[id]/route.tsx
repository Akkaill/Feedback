import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request
) {
  try {

    const {name} = await req.json()
    const user = await db.user.findUnique({
      where: { name },
      include: { votes: { include: { aspect: { select: { name: true } } } } },
    });
    return NextResponse.json(user?.votes);
  } catch (error) {
    return NextResponse.json({ error: "User not found " });
  }
}
