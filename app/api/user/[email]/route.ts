import prisma from "@/utils/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const gas = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
    });
    return NextResponse.json(gas);
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
