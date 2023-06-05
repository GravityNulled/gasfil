import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/client";
import { PaymentTransaction } from "@prisma/client";

export async function GET(request: Request, response: Response) {
  try {
    const payments: PaymentTransaction[] =
      await prisma.paymentTransaction.findMany();
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const { orderId, amount, userId, payment_method } = body;
  if (!orderId || !amount || !userId || !payment_method) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }
  try {
    const product = await prisma.paymentTransaction.create({
      data: {
        orderId,
        amount,
        userId,
        payment_method,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
