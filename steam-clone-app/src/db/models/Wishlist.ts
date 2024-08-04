import { ObjectId } from "mongodb";
import { z } from "zod";
import { getDB } from "../connection";

export type WishListItem = {
  _id: ObjectId | string;
  userId: ObjectId | string;
  productId: ObjectId | string;
  createdAt: Date;
  updatedAt?: Date;
};


export interface WishlistData {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updateAt: string;
  games: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: number;
    tags: string[];
    thumbnail: string;
    images: string[];
    createdAt: string;
  };
}


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
    try {
      const DB = await getDB(); // Assuming getDB() function returns the MongoDB database instance
      const result = await DB.collection("Wishlist").deleteOne({
        _id: new ObjectId(wishlistItemId), // Convert wishlistItemId to ObjectId
      });
      console.log(wishlistItemId, result)
      return result;
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
      throw error; // Propagate the error to the caller
    }
  }

  static async getWishList(userId: string): Promise<any[]> {
    const DB = await getDB();
    const agg = [
      {
        '$match': {
          'userId': new ObjectId(userId)
        }
      }, {
        '$lookup': {
          'from': 'Games', 
          'localField': 'productId', 
          'foreignField': '_id', 
          'as': 'games'
        }
      }, {
        '$unwind': {
          'path': '$games', 
          'preserveNullAndEmptyArrays': true
        }
      }
    ]
    const result = await DB.collection("Wishlist").aggregate(agg).toArray();

    return result;
  }
}

export default WishlistModel;
