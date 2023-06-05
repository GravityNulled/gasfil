import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/client";
import { RefillRequest } from "@prisma/client";

export async function GET(request: Request, response: Response) {
  try {
    const refills: RefillRequest[] = await prisma.refillRequest.findMany();
    return NextResponse.json(refills);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const { request_date, status, size, gasType } = body;
  if (!request_date || !status || !size || !gasType) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }
  try {
    const product = await prisma.refillRequest.create({
      data: {
        request_date,
        gasType,
        status,
        size,
        userId: "asaas",
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
