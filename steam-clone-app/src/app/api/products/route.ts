import ProductModel from "@/db/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await ProductModel.getAllProduct()
    // console.log(products);
    
    return NextResponse.json({
        status: 200,
        data: products
    });
  } catch (error) {
    // console.log(typeof error );
    return NextResponse.json({
      status: 400,
      message: error
    })
    
  };
};
