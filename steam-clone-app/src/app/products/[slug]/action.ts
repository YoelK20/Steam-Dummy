// actions/wishlist.ts

import WishlistModel from "@/db/models/Wishlist";
import { ObjectId } from "mongodb";

export async function addWishlist(userId: string, productId: string) {
  // Assuming you have a WishlistModel to handle database operations
  const newWishlistItem = await WishlistModel.addWishList({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    createdAt: new Date(),
    updateAt: new Date()
  });

  return newWishlistItem;
}
