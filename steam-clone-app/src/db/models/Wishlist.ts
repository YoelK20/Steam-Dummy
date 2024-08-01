import { ObjectId } from "mongodb"
import { z } from "zod";
import { getDB } from "../connection";

export type WishListInput = {
    _id: ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    createdAt: Date;
    updateAt: Date;
}


export type CreateWishListInput = Omit<WishListInput, "_id">;


const WishlistSchema = z.object({
    userId: z.string({ message: "User ID is Required"}),
    productId: z.string({ message: "Product ID is Required"})
})

class WishlistModel {
    static async addWishList (newWish: CreateWishListInput) {
        WishlistSchema.parse(newWish)
        const DB = await getDB()
        const wish : CreateWishListInput = {
            ...newWish,
            createdAt: new Date(),
            updateAt: new Date()

        }

        const result = DB.collection("Wishlist").insertOne(wish)
        return result
    }
}

export default WishlistModel