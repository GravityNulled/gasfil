import prisma from "@/utils/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gas = await prisma.gasProduct.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(gas);
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.gasProduct.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
