"use client"
import Image from "next/image";
import logo from "@/app/assets/guardians-galaxy-scaled.jpg";
import Link from "next/link";
import { baseUrl, localUrl } from "@/db/helpers/BaseUrl";
import { redirect, useRouter } from "next/navigation";

interface Product {
  id:string
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  thumbnail: string;
}

export const Card = (props: Product) => {
  const router = useRouter();
  async function AddWish() {
    try {
      const res = await fetch(`${baseUrl}/api/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId : props.id }),
      })

      if(!res.ok){
        throw new Error("Failed to add games into Wishlist")
      }

      router.push('/wishlist');
    } catch (error) {
      console.log(error);
      throw error
      
    }
  }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-cyan-700">
      <img
          src={props.thumbnail}
          alt={props.name}
          width={300}
          height={300}
          className="w-full object-cover"
        />
      <div className="px-6 py-8 bg-cyan-700 text-white">
        <div className="font-bold text-xl mb-2">{props.name}</div>
        <p className="text-base">{props.excerpt }</p>
        <div className="flex items-center mt-4">
          <span className="text-2xl font-bold">Rp {props.price}</span>
        </div>
        <div className="mt-4">
          <button className="bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded w-full mb-2" onClick={AddWish}>
            Add to Wishlist
          </button>
          <Link key={props.id} href={`/products/${props.slug}`}>
          <button className="bg-sky-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded w-full">
            Show Detail
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
