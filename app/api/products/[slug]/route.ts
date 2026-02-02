import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/services/connection";
import { Product } from "@/services/models/product";

const getIdFromParams = (params: { slug?: string }) => {
  const id = params?.slug;
  if (!id) return null;
  return mongoose.Types.ObjectId.isValid(id) ? id : null;
};

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ slug?: string }> }
) => {
  try {
    await connectDB();

    const slug = (await params).slug;

    if (!slug) {
      return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
    }
    const productResult = await Product.aggregate([
      { $match: { slug } },

      // Lookup reviews
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "product",
          as: "reviews"
        }
      },

      // Add avg rating & count
      {
        $addFields: {
          averageRating: { $ifNull: [{ $avg: "$reviews.rating" }, 0] },
          reviewCount: { $size: "$reviews" }
        }
      },

      // remove reviews array 
      {
        $project: {
          reviews: 0,
        },
      },
    ]);

    const product = productResult[0] || null;

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { slug?: string } }
) => {
  try {
    await connectDB();
    const id = getIdFromParams(params);
    if (!id) {
      return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
    }

    const payload = await request.json();
    if (!payload || Object.keys(payload).length === 0) {
      return NextResponse.json(
        { error: "No update data provided" },
        { status: 400 }
      );
    }

    if (payload.price !== undefined) {
      const price = Number(payload.price);
      if (!Number.isFinite(price)) {
        return NextResponse.json(
          { error: "Price must be a valid number" },
          { status: 400 }
        );
      }
      payload.price = price;
    }

    if (payload.stock !== undefined) {
      const stock = Number(payload.stock);
      if (!Number.isFinite(stock)) {
        return NextResponse.json(
          { error: "Stock must be a valid number" },
          { status: 400 }
        );
      }
      payload.stock = stock;
    }

    const product = await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    }).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
};

export const PATCH = PUT;

export const DELETE = async (
  _request: Request,
  { params }: { params: { slug?: string } }
) => {
  try {
    await connectDB();
    const id = getIdFromParams(params);
    if (!id) {
      return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
    }

    const product = await Product.findByIdAndDelete(id).lean();
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
};
