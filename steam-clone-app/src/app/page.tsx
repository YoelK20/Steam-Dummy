import Banner from "@/components/Banner";
import { Card } from "@/components/Card";
import { ProductInput } from "@/db/models/Product";
import { ApiResponseType } from "./api/types";
import { localUrl } from "@/db/helpers/BaseUrl";
// import Image from "next/image";
async function fetchProducts(): Promise<ProductInput[]> {
  try {
    const res = await fetch(`${localUrl}/api/home`, {
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

export default async function Home() {
  const products = await fetchProducts();
  
  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="bg-slate-700">
        <Banner />
      </div>
      <div className="flex flex-wrap justify-center mx-auto gap-4 p-4">
        {products.map((el) => (
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
        ))}
      </div>
    </div>
  );
}
