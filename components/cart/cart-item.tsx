'use client'
import { Product } from "@/types/product"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent } from "react"
import { handleDeleteCart, updateCart } from "./service"

type Props = {
  item: Product
  qty: number
}
export const CartItem = ({ item, qty }: Props) => {
  const router = useRouter()
  const handleUpdateCount = async (event: ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(event.target.value)

    try {
      const status = await updateCart(item._id, quantity)
      if (status === 200) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error updating cart:', error)
    } finally {
    }
  }
  return <div className="p-4 border-b border-gray-300 flex gap-4 hover:bg-gray-50">
    <div className="w-32 h-32 shrink-0">
      <Image
        width={128}
        height={128}
        src={item.defaultImage}
        className="w-full h-full object-cover rounded border border-gray-200"
        alt={item.productName}
      />
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-base mb-1">
        <Link
          href={`/products/${item.slug}`}
          className="text-amazon-blue hover:text-amazon-orange hover:underline"
        >
          {item.productName}
        </Link>
      </h3>
      <p className="text-sm text-green-700 font-medium">{item.availability}</p>
      <p className="text-xs text-gray-600 mt-1">
        Sold by: Official {item.brand} Store
      </p>
      <p className="text-xs text-gray-600">Eligible for FREE Shipping</p>
      <div className="flex items-center gap-4 mt-3">
        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-600">Qty:</label>
          <select value={qty} onChange={handleUpdateCount} className="border border-gray-400 rounded-md px-2 py-1 text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-amazon-blue">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <span className="text-gray-300">|</span>
        {/* Delete Button */}
        <button onClick={() => handleDeleteCart(item._id)} className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline">
          Delete
        </button>
        <span className="text-gray-300">|</span>
        {/* Save for Later */}
      </div>
    </div>
    <div className="text-right">
      <p className="text-lg font-bold text-amazon-orange">৳{item.price * qty}</p>
    </div>
  </div>
}

