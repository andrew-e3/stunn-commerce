import { getProduct } from "lib/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const handle = request.nextUrl.searchParams.get("handle");
  if (!handle)
    return NextResponse.json({ error: "Missing handle" }, { status: 400 });

  const product = await getProduct(handle);
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    variants: product.variants.map((v) => ({
      id: v.id,
      title: v.title,
      selectedOptions: v.selectedOptions,
      price: v.price,
    })),
  });
}
