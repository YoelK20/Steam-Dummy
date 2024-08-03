import Image from "next/image";
import { NextRequest } from "next/server";

const wishlistItems = [
  {
    id: 1,
    title: "Borderlands Game of the Year",
    image: "/path/to/borderlands-image.jpg",
    reviews: "MOSTLY POSITIVE",
    releaseDate: "27 OCT, 2009",
    price: "Rp 319 000",
    tags: ["Looter Shooter", "FPS", "Co-op", "RPG", "Action"],
    addedDate: "29/06/2019",
  },
  {
    id: 2,
    title: "State of Decay 2: Juggernaut Edition",
    image: "/path/to/state-of-decay-image.jpg",
    reviews: "VERY POSITIVE",
    releaseDate: "13 MAR, 2020",
    price: "Rp 239 000",
    tags: ["Survival", "Open World", "Zombies", "Base Building", "Multiplayer"],
    addedDate: "27/11/2019",
  },
  {
    id: 3,
    title: "WORLD OF FINAL FANTASY®",
    image: "/path/to/world-of-final-fantasy-image.jpg",
    reviews: "MOSTLY POSITIVE",
    releaseDate: "22 NOV, 2017",
    price: "Rp 330 000",
    tags: ["RPG", "JRPG", "Creature Collector", "Turn-Based Combat", "Fantasy"],
    addedDate: "29/06/2019",
  },
  {
    id: 4,
    title: "Monster Hunter: World",
    image: "/path/to/monster-hunter-image.jpg",
    reviews: "VERY POSITIVE",
    releaseDate: "9 AUG, 2018",
    price: "Rp 334 999",
    tags: ["Co-op", "Multiplayer", "Action", "Open World", "RPG"],
    addedDate: "",
  },
];

export default function Wishlist() {
  return (
    <div className="bg-slate-800 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-slate-900 rounded-md shadow-md p-6">
        <div className="text-white text-2xl mb-4">KRYST'S WISHLIST</div>
        <input
          type="text"
          placeholder="Search by name or tag"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center bg-gray-700 rounded-md p-4 space-y-4 md:space-y-0 md:space-x-4"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={150}
                height={84}
                className="rounded-md"
              />
              <div className="flex-1">
                <div className="text-white text-xl font-semibold">{item.title}</div>
                <div className="text-gray-400"><br />
                  <div className="text-xs">RELEASE DATE: {item.releaseDate}</div><br />
                  <div className="text-gray-400 text-xs">Added to Wishlist on {item.addedDate}</div><br />
                </div>
                <div className="flex flex-wrap mt-2 space-x-2">
                  {item.tags.map((tag, index) => index < 4 && (
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
                  <div className="text-white text-xs">{item.price}</div>
                  <button className="bg-red-400 text-white px-4 py-2 rounded text-xs">
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
