/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/services/connection";
import { Cart } from "@/services/models/cart";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const headerList = request.headers

  const sessionId = headerList.get('sessionId')
  await connectDB();

  const cartResult = await Cart.aggregate([
    { $match: { sessionID: sessionId } },
    { $unwind: "$products" },
    {
      $lookup: {
        from: "productlists",
        localField: "products.product",
        foreignField: "_id",
        as: "productDoc"
      }
    },
    { $unwind: { path: "$productDoc", preserveNullAndEmptyArrays: true } },
    { $addFields: { "products.product": "$productDoc" } },
    { $project: { productDoc: 0 } },
    {
      $group: {
        _id: "$_id",
        sessionID: { $first: "$sessionID" },
        userId: { $first: "$userId" },
        products: { $push: "$products" }
      }
    }
  ])

  const cart = cartResult[0] || null;
  if (!cart) {
    return NextResponse.json({ data: null, error: "Cart not found" });
  }
  // return NextResponse.json({ data: cart });
  return NextResponse.json({ data: cart });
}

export const POST = async (request: NextRequest) => {
  await connectDB();
  const { productId, quantity } = await request.json();
  const sessionId = (request.headers.get('sessionId') ?? '')
  let cart = await Cart.findOne({ sessionID: sessionId });
  if (cart) {
    const itemIndex = cart.products.findIndex((p: any) => p.product === productId);
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    await cart.save();
  } else {
    cart = await Cart.create({ sessionID: sessionId, products: [{ product: productId, quantity }] });

  }
  return NextResponse.json({ data: null });
}

export const PUT = async (request: NextRequest) => {
  await connectDB();
  const { productId, quantity } = await request.json();
  const sessionId = (request.headers.get('sessionId') ?? '');

  if (!productId || typeof quantity !== "number") {
    return NextResponse.json({ data: null, error: "Invalid payload" }, { status: 400 });
  }
  if (quantity < 1) {
    return NextResponse.json({ data: null, error: "Quantity must be at least 1" }, { status: 400 });
  }

  const cart = await Cart.findOne({ sessionID: sessionId });
  if (!cart) {
    return NextResponse.json({ data: null, error: "Cart not found" }, { status: 404 });
  }

  const item = cart.products.find((p: any) => p.product?.toString() === productId);
  if (!item) {
    return NextResponse.json({ data: null, error: "Item not found" }, { status: 404 });
  }

  item.quantity = quantity;
  await cart.save();

  return NextResponse.json({ data: cart });
}

export const DELETE = async (request: NextRequest) => {
  await connectDB();
  const { productId } = await request.json();
  const sessionId = (request.headers.get('sessionId') ?? '');

  if (!productId) {
    return NextResponse.json({ data: null, error: "Invalid payload" }, { status: 400 });
  }

  const cart = await Cart.findOne({ sessionID: sessionId });
  if (!cart) {
    return NextResponse.json({ data: null, error: "Cart not found" }, { status: 404 });
  }

  const originalCount = cart.products.length;
  cart.products = cart.products.filter((p: any) => p.product?.toString() !== productId);
  if (cart.products.length === originalCount) {
    return NextResponse.json({ data: null, error: "Item not found" }, { status: 404 });
  }

  await cart.save();
  return NextResponse.json({ data: cart });
}