/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PipelineStage } from "mongoose";
import { connectDB } from "@/services/connection";
import { Product } from "@/services/models/product";

const requiredFields = [
  "productName",
  "category",
  "brand",
  "condition",
  "description",
  "price",
  "stock",
  "warranty",
  "defaultImage"
];

const parseMulti = (value: string | string[] | null) => {
  if (!value) return null;
  const raw = Array.isArray(value) ? value.join(',') : value;
  const values = raw.split(',').map((item) => item.trim()).filter(Boolean);
  return values.length ? values : null;
}

export const GET = async (req: NextRequest,) => {
  try {
    await connectDB();

    const searchQuery = req.nextUrl.searchParams

    const page = Number(searchQuery.get("page")) || 1;

    const limit = Number(searchQuery.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const filters: Record<string, any> = {}

    const categories = parseMulti(searchQuery.get("category"));
    const brands = parseMulti(searchQuery.get("brand"));
    //category
    if (categories) {
      filters.category = { $in: categories };
    }
    // brand
    if (brands) {
      filters.brand = { $in: brands };
    }
    // condition
    const condition = searchQuery.get("condition");
    if (condition) {
      filters.condition = condition;
    }
    const rating = searchQuery.get("rating");
    // Price range
    const priceRange = searchQuery.get("priceRange") ?? '';
    const [priceMin, priceMax] = priceRange.split('-').map(Number);

    if (priceMin || priceMax) {
      filters.price = {};
      if (priceMin) filters.price.$gte = Number(priceMin);
      if (priceMax) filters.price.$lte = Number(priceMax);
    }
    // Availability
    const availability = searchQuery.get("availability");
    if (availability) {
      filters.availability = availability;
    }
    const sort = searchQuery.get("sort");
    let sortBy: Record<string, any> = { createdAt: -1 };
    const sortOption = {
      'featured': { createdAt: -1 },
      'price-low-to-high': { price: 1 },
      'price-high-to-low': { price: -1 },
      'rating': { averageRating: -1 },
      'newest': { createdAt: -1 },
      'oldest': { createdAt: 1 },
    }
    if (sort) {
      const sortOrder = sortOption[sort as keyof typeof sortOption] || sortOption.featured;
      sortBy = sortOrder;
    }
    const basePipeline: PipelineStage[] = [
      { $match: filters },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "product",
          as: "reviews"
        }
      },
      {
        $addFields: {
          averageRating: { $ifNull: [{ $avg: "$reviews.rating" }, 0] },
          reviewCount: { $size: "$reviews" }
        }
      }
    ];

    if (rating) {
      basePipeline.push({
        $match: { averageRating: { $gte: Number(rating) } }
      });
    }

    const dataPipeline: PipelineStage[] = [
      ...basePipeline,
      { $sort: sortBy },
      { $skip: skip },
      { $limit: limit }
    ];
    const countPipeline: PipelineStage[] = [
      ...basePipeline,
      { $count: "count" }
    ];

    const facetPipeline = await Product.aggregate([
      {
        $facet: {
          data: dataPipeline,
          totalCount: countPipeline
        }
      }
    ] as PipelineStage[]);

    const products = facetPipeline[0]?.data ?? [];
    const totalCount = facetPipeline[0]?.totalCount?.[0]?.count ?? 0;
    const totalPages = Math.ceil(totalCount / limit);
    const pagination = {
      totalCount,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
    return NextResponse.json({
      data: products,
      pagination
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    await connectDB();
    const payload = await request.json();

    const missingFields = requiredFields.filter((field) => {
      const value = payload?.[field];
      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const price = Number(payload.price);
    const stock = Number(payload.stock);

    if (!Number.isFinite(price) || !Number.isFinite(stock)) {
      return NextResponse.json(
        { error: "Price and stock must be valid numbers" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      ...payload,
      price,
      stock,
      slug: payload.slug
    });

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
};
