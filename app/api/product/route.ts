import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/client";
import { GasProduct } from "@prisma/client";

export async function GET(request: Request, response: Response) {
  try {
    const products: GasProduct[] = await prisma.gasProduct.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const { name, price, description, quantity_available, image, size } = body;
  if (
    !name ||
    !price ||
    !description ||
    !quantity_available ||
    !image ||
    !size
  ) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }
  try {
    const product = await prisma.gasProduct.create({
      data: {
        name,
        description,
        price,
        quantity_available,
        image,
        size,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
