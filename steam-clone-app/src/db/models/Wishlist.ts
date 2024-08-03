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
            userId: new ObjectId(newWish.userId),
            productId: new ObjectId(newWish.productId),
            createdAt: new Date(),
            updateAt: new Date()

        }

        const result = DB.collection("Wishlist").insertOne(wish)
        return result
    }

    static async getWishList(id: string){
        const DB = await getDB()
        const agg = [
            {
              '$match': {
                '_id': new ObjectId(id)
              }
            }, {
              '$project': {
                'password': 0
              }
            }, {
              '$lookup': {
                'from': 'Wishlist', 
                'localField': '_id', 
                'foreignField': 'userId', 
                'as': 'wishlist'
              }
            }, {
              '$lookup': {
                'from': 'Games', 
                'localField': 'wishlist.productId', 
                'foreignField': '_id', 
                'as': 'wishlist'
              }
            }
          ]
          const result = DB.collection("Users").aggregate(agg).toArray()

          return result
    }
}

export default WishlistModel