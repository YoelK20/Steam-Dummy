import ProductModel from "@/db/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
    const slug = params.slug

    const gameData = await ProductModel.getProductBySlug(slug)

    return NextResponse.json({
        status: 200,
        message: `Success get game data of ${gameData.name}`,
        data: gameData
    })
}
