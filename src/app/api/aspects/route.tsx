import { db } from "../../../../lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(await db.aspect.findMany());
  } catch (error) {
    return NextResponse.json({ error: "Error for Fetching Aspects" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    return NextResponse.json(await db.aspect.create({ data: { name } }));
  } catch (error) {
    return NextResponse.json({ error: "Error for Creating Aspects" });
  }
}
