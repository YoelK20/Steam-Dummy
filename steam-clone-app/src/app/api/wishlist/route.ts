import WishlistModel from "@/db/models/Wishlist";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    const body = await req.json();
    const data = await WishlistModel.addWishList(body);

    return NextResponse.json(
      {
        message: `Success add to wishlist`,
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
