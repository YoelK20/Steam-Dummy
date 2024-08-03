import { ObjectId } from "mongodb";
import { z } from "zod";
import { getDB } from "../connection";

export type WishListItem = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateWishListItemInput = Omit<WishListItem, "_id">;

const WishlistSchema = z.object({
  userId: z.string({ message: "User ID is Required" }),
  productId: z.string({ message: "Product ID is Required" }),
});

class WishlistModel {
  static async addWishList(newWish: CreateWishListItemInput) {
    WishlistSchema.parse(newWish);
    const DB = await getDB();
    const wish: CreateWishListItemInput = {
      ...newWish,
      userId: new ObjectId(newWish.userId),
      productId: new ObjectId(newWish.productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await DB.collection("Wishlist").insertOne(wish);
    return result;
  }

  static async deleteWishlistItem(wishlistItemId: string) {
    const DB = await getDB();
    const result = await DB.collection("Wishlist").deleteOne({
      _id: new ObjectId(wishlistItemId),
    });
    return result;
  }

  static async getWishList(id: string) {
    const DB = await getDB();
    const agg = [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $project: {
          password: 0,
        },
      },
      {
        $lookup: {
          from: "Wishlist",
          localField: "_id",
          foreignField: "userId",
          as: "wishlist",
        },
      },
      {
        $lookup: {
          from: "Games",
          localField: "wishlist.productId",
          foreignField: "_id",
          as: "wishlist",
        },
      },
    ];
    const result = await DB.collection("Users").aggregate(agg).toArray();

    return result;
  }
}

export default WishlistModel;
