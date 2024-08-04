import ProductModel from "@/db/models/Product";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const products = await ProductModel.get8Product();
    return NextResponse.json({
      status: 200,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

