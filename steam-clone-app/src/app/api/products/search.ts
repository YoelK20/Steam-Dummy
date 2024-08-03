import type { NextApiRequest, NextApiResponse } from 'next';
import { ProductInput } from '@/db/models/Product';
import { getDB } from '@/db/connection';

interface ApiResponse {
  data: ProductInput[];
  totalCount: number;
}

// Connect to the database
async function getProducts(searchQuery: string, page: number, pageSize: number): Promise<ApiResponse> {
  const db = await getDB()

  // Construct the search query
  const query = searchQuery
    ? { name: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search
    : {};

  // Find products with pagination
  const products = await db.collection('Games')
    .find(query)
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray() as ProductInput[]

  // Get the total count of products matching the query
  const totalCount = await db.collection('Games')
    .countDocuments(query);

  return {
      data: products,
      totalCount
  };
}

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { searchQuery = '', page = 0, pageSize = 8 } = req.query;

    if (typeof searchQuery !== 'string') {
      return res.status(400).json({ error: 'Invalid search query' });
    }

    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);

    const result = await getProducts(searchQuery, pageNumber, pageSizeNumber);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
