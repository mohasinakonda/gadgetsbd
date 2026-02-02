import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/services/connection";
import { Review } from "@/services/models/review";

const getProductIdFromQuery = (req: NextRequest) => {
  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) return null;
  return mongoose.Types.ObjectId.isValid(productId) ? productId : null;
};

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const productId = getProductIdFromQuery(req);
    if (!productId) {
      return NextResponse.json(
        { error: "Invalid product id" },
        { status: 400 }
      );
    }

    const [reviews, summary] = await Promise.all([
      Review.find({ product: productId })
        .sort({ createdAt: -1 })
        .lean(),
      Review.aggregate([
        { $match: { product: new mongoose.Types.ObjectId(productId) } },
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" },
            reviewCount: { $sum: 1 }
          }
        }
      ])
    ]);

    const totals = summary[0] ?? { averageRating: 0, reviewCount: 0 };

    return NextResponse.json({
      data: reviews,
      summary: {
        averageRating: totals.averageRating ?? 0,
        reviewCount: totals.reviewCount ?? 0
      }
    });
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const payload = await req.json();
    const productId = payload?.productId;
    const rating = Number(payload?.rating);

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product id" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await Review.create({
      product: productId,
      user: payload?.userId,
      userName: payload?.userName,
      rating,
      title: payload?.title,
      comment: payload?.comment,
      image: payload?.image
    });

    return NextResponse.json({ data: review }, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
};
