import Link from 'next/link';
import { Metadata } from 'next';
import { localUrl } from '@/db/helpers/BaseUrl';
import { addWishlist } from './action';

interface Product {
  data: any;
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  createdAt: string;
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params, searchParams }: Props,
): Promise<Metadata> {
  const slug = params.slug;

  const game: Product = await fetchProductBySlug(slug);

  return {
    title: game.name,
    description: game.description
  };
}

async function fetchProductBySlug(slug: string): Promise<Product> {
  const res = await fetch(`${localUrl}/api/products/${slug}`);
  const data: Product = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to fetch data product ${slug}`);
  }

  return data.data;
}


const GameDetail = async ({ params }: { params: { slug: string } }) => {
  const product = await fetchProductBySlug(params.slug);

  async function handleAddWish(){
    const data = await addWishlist(product.id)
    return data
  }

  return (
    <div className="bg-gray-800 min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex">
          <div className="w-3/4 pr-4">
            <img src={product.thumbnail} alt={product.name} width={1000} height={500} className="rounded" />
            <div className="flex mt-4">
              <div className="w-1/5">
                <img src={product.images[0]} alt="Thumbnail 1" width={200} height={100} className="rounded" />
              </div>
              <div className="w-1/5 ml-2">
                <img src={product.images[1]} alt="Thumbnail 2" width={200} height={100} className="rounded" />
              </div>
              <div className="w-1/5 ml-2">
                <img src={product.images[2]} alt="Thumbnail 3" width={200} height={100} className="rounded" />
              </div>
              <div className="w-1/5 ml-2">
                <img src={product.images[3]} alt="Thumbnail 4" width={200} height={100} className="rounded" />
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2">{product.description}</p>
            <p className="mt-4"><span className="font-bold">Release Date:</span>{product.createdAt}</p>
            <div className="mt-4">
              <span className="font-bold">Tags:</span>
              <div className="mt-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-700 p-1 rounded mr-2">{tag}</span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <form>
                <input type="hidden" name="productId" value={product.id} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add to your wishlist
                </button>
              </form>
              <Link href={`/products`}>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
