import WishlistModel, { CreateWishListItemInput } from "@/db/models/Wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // const newWish = async ():Promise<CreateWishListInput>  => {
    //     return req.headers.get("")
    // }
    
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

// export async function GET(req: NextRequest) {
//     try {
//         const body = await req.json()
//         console.log(body);
        
//         const wishListData = await WishlistModel.getWishList(body.userId)
//         return NextResponse.json({});
//     } catch (error) {
//         const body = await req.json()
//         console.log(error);
//         return error
//     }
// }
