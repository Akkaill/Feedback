import { NextApiRequest } from "next";
import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
) {
  try {
    const { name } = req.query as {name:string};
    return NextResponse.json(await db.user.findUnique({ where: { name } }));
  } catch (error) {
    return NextResponse.json({ error: "Error Fetching User By Id" });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    return NextResponse.json(
      await db.user.delete({
        where: { id: params.id },
      })
    );
  } catch (error) {
    return NextResponse.json({ error: "Error Deleting User By Id" });
  }
}
