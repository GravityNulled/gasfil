import prisma from "@/utils/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.order.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
