import prisma from "@/utils/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const refillRequest = await prisma.refillRequest.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(refillRequest);
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.refillRequest.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
