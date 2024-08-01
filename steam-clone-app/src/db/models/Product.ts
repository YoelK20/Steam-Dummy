import { ObjectId } from "mongodb";
import { z } from "zod";
import { getDB } from "../connection";

export type ProductInput = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProductInput = Omit<ProductInput, "_id">;

const ProductSchema = z.object({
  name: z.string({
    message: "Product Name is Required",
  }),
});


class ProductModel {
  static async addProduct(newProduct: CreateProductInput) {
    ProductSchema.parse(newProduct);
    const DB = await getDB()
    
    const game : CreateProductInput = {
        ...newProduct,
        slug: `${newProduct.name.split(" ").join("-")}-${new Date(newProduct.createdAt).getTime()}`,
        createdAt: new Date()
    }

    const newGame = DB.collection("Games").insertOne(game)
    const data = DB.collection("Games").findOne({
        _id: new ObjectId((await newGame).insertedId)
    })

    return data
  }

  static async getAllProduct(): Promise<ProductInput[]>{
    const DB = await getDB()
    const games = (await DB.collection("Games").find().toArray()) as ProductInput[]

    return games
  }

  static async getProductBySlug(slug: string): Promise<ProductInput>{
    const DB = await getDB()
    const game = (await DB.collection("Games").findOne({slug})) as ProductInput

    return game
  }
}

export default ProductModel