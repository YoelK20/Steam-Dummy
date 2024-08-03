"use client";
import { Card } from "@/components/Card";
import { ApiResponseType } from "../api/types";
import { useEffect, useState, useCallback } from "react";
import { ProductInput } from "@/db/models/Product";
import { localUrl } from "@/db/helpers/BaseUrl";

async function fetchProducts(query: string = ""): Promise<ProductInput[]> {
  try {
    const res = await fetch(`${localUrl}/api/products?search=${query}`, {
      cache: "no-store",
    });

    const data: ApiResponseType<ProductInput[]> = await res.json();
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
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchProducts(debouncedSearchInput)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [debouncedSearchInput]);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    debouncedSearch(event.target.value);
  };

  const debouncedSearch = useCallback(debounce((query: string) => {
    setDebouncedSearchInput(query);
  }, 500), []);

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="flex justify-center p-4 items-center">
        <div className="input input-bordered h-[50px] input-sm">
          <form action="" method="get" className="flex items-center justify-start mt-2">
            <input
              type="search"
              name="search"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchInputChange}
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
