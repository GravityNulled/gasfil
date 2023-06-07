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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gas = await prisma.gasProduct.findUnique({
      where: {
        id: params.id,
      },
    });
    if (gas) {
      const quantity_available = gas.quantity_available - 1;
      await prisma.gasProduct.update({
        where: {
          id: params.id,
        },
        data: {
          quantity_available,
        },
      });
      return NextResponse.json({ message: "Updated Successfully" });
    }
    return NextResponse.json(
      { message: "Product not found!" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
