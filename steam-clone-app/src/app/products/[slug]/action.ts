import { headers } from "next/headers";
import WishlistModel from "@/db/models/Wishlist";
import { ObjectId } from "mongodb";

export async function addWishlist(productId: string) {
  const headersList = headers();
  const userId = headersList.get("x-user-id");

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const newWishlistItem = await WishlistModel.addWishList({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return newWishlistItem;
}
