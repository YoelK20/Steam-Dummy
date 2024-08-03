import { NextApiRequest, NextApiResponse } from 'next';
import { addWishlist } from '@/app/products/[slug]/action';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { productId } = req.body;

      const headers = req.headers;
      const userId = headers['x-user-id'] as string;

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const newWishlistItem = await addWishlist(userId, productId);

      return res.status(200).json({
        message: 'Wishlist item added successfully',
        data: newWishlistItem,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
