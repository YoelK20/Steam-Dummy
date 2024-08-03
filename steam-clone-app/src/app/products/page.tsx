"use client";
import { Card } from "@/components/Card";
import { ApiResponseType } from "../api/types";
import { useEffect, useState } from "react";
import { ProductInput } from "@/db/models/Product";
import { Metadata, ResolvedMetadata } from "next";

// export type ProductData = {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   excerpt: string;
//   price: number;
//   tags: string[];
//   thumbnail: string;
//   images: string[];
//   createdAt: Date;
//   updatedAt: Date;
// };

async function fetchProducts(): Promise<ProductInput[]> {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });

    const data: ApiResponseType<ProductInput[]> = await res.json();
    // console.log(data, "<<<<< Hasil fetch all product data");
    if (!res.ok) {
      throw new Error("Failed to Fetch data");
    }

    return data.data || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default function Products() {
  const [products, setProducts] = useState<ProductInput[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // console.log(products, "<<<<<< hasil dari products");

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      });
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="flex justify-center p-4 items-center">
        <div className="input input-bordered  w-[85%] h-[50px] input-sm">
          <form
            action=""
            method="get"
            className="flex items-center justify-start mt-2"
          >
            <input
              type="search"
              name="search"
              placeholder="Search"
              //   onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mx-auto gap-4 p-4">
        {loading ? (
          <div className="text-white text-xl">Loading...</div>
        ) : (
          products.map((el) => (
            <Card
              key={el._id.toString()}
              id={el._id.toString()}
              description={el.description}
              name={el.name}
              excerpt={el.excerpt}
              thumbnail={el.thumbnail}
              price={el.price}
              slug={el.slug}
            />
          ))
        )}
      </div>
    </div>
  );
}
