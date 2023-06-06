import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/client";
import { Order } from "@prisma/client";

export async function GET(request: Request, response: Response) {
  try {
    const orders: Order[] = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const { total_amount, userId, productId } = body;
  if (!total_amount || !userId || !productId) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        total_amount,
        productId,
      },
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
