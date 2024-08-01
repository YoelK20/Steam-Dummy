import Image from 'next/image';
import img from "@/app/assets/guardians-galaxy-scaled.jpg"

interface Product {
  id: string;
  name: string;
  
}
const GameDetail = () => {
  return (
    <div className="bg-gray-800 min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex">
          <div className="w-3/4 pr-4">
            <Image src={img} alt="Assassin's Creed Valhalla" width={1000} height={500} className="rounded" />
            <div className="flex mt-4">
              <div className="w-1/5">
                <Image src={img} alt="Thumbnail 1" width={200} height={100} className="rounded" />
              </div>
              <div className="w-1/5 ml-2">
                <Image src={img} alt="Thumbnail 2" width={200} height={100} className="rounded" />
              </div>
              <div className="w-1/5 ml-2">
                <Image src={img} alt="Thumbnail 3" width={200} height={100} className="rounded" />
              </div>
              <div className="w-1/5 ml-2">
                <Image src={img} alt="Thumbnail 4" width={200} height={100} className="rounded" />
              </div>
              <div className="w-1/5 ml-2">
                <Image src={img} alt="Thumbnail 4" width={200} height={100} className="rounded" />
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <h1 className="text-3xl font-bold">Assassin's Creed Valhalla</h1>
            <p className="mt-2">Become a legendary Viking on a quest for glory. Raid your enemies, grow your settlement, and build your political power.</p>
            <p className="mt-4"><span className="font-bold">Release Date:</span> 7 Dec, 2022</p>
            <div className="mt-4">
              <span className="font-bold">Tags:</span>
              <div className="mt-2">
                <span className="bg-gray-700 p-1 rounded mr-2">Action</span>
                <span className="bg-gray-700 p-1 rounded mr-2">RPG</span>
                <span className="bg-gray-700 p-1 rounded mr-2">Adventure</span>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to your wishlist</button>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
