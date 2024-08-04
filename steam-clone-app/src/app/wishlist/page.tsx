"use client"
import Image from "next/image";
import { NextRequest } from "next/server";

import { ApiResponseType } from "../api/types";
import { useEffect, useState, useCallback } from "react";
import { WishlistData } from "@/db/models/Wishlist";
import { baseUrl, localUrl } from "@/db/helpers/BaseUrl";


export default function Wishlist() {
  const [games, setGames] = useState<WishlistData[] | []>([])

  async function fetchWishlist() {
    try {
      const res = await fetch(`${baseUrl}/api/wishlist`, {
        // cache: "no-store",
      });
  
      const data: ApiResponseType<WishlistData[]> = await res.json();
      if (!res.ok) {
        throw new Error("Failed to Fetch data");
      } else {
        if (data.data) {
          setGames(data.data);
          console.log(data.data);
          
        } else {
          setGames([]);
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function deleteWishlist(idWishlist: string) {
    try {
      
      const res = await fetch(`${baseUrl}/api/wishlist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wishlistId: idWishlist }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete wishlist item");
      } 

      fetchWishlist();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  
useEffect(() => {
  fetchWishlist()
}, [])

function formatDate(dateString: string): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const day = date.getDate().toString().padStart(2, '0');
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${monthName} ${year}`;
}

  return (
    <div className="bg-slate-800 min-h-screen p-4">
      
      <div className="max-w-4xl mx-auto bg-slate-900 rounded-md shadow-md p-6">
        <div className="text-white text-2xl mb-4">KRYSTS WISHLIST</div>
        <input
          type="text"
          placeholder="Search by name or tag"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <div className="space-y-4">
          {games.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center bg-gray-700 rounded-md p-4 space-y-4 md:space-y-0 md:space-x-4"
            >
              <img
                src={item.games.thumbnail}
                alt={item.games.name}
                width={150}
                height={84}
                className="rounded-md"
              />
              <div className="flex-1">
                <div className="text-white text-xl font-semibold">{item.games.name}</div>
                <div className="text-gray-400"><br />
                  <div className="text-xs">RELEASE DATE: {formatDate(item.games.createdAt)}</div><br />
                  <div className="text-gray-400 text-xs">Added to Wishlist on {formatDate(item.createdAt)}</div><br />
                </div>
                <div className="flex flex-wrap mt-2 space-x-2">
                  {item.games.tags.map((tag, index) => index < 4 && (
                    <span
                      key={index}
                      className="bg-gray-600 text-gray-300 text-xs p-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-4 bg-slate-800 p-2 rounded-md">
                  <div className="text-white text-xs">{item.games.price.toLocaleString()}</div>
                  <button className="bg-red-400 text-white px-4 py-2 rounded text-xs" onClick={() => deleteWishlist(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
