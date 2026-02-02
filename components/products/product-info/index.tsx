'use client'

import { Product } from "@/types/product"
import { useState } from "react"
import { Description } from "../description"
import { Review } from "./review"
type Props = {
  product: Product
}
export const ProductInfo = ({ product }: Props) => {
  const [activeTab, setActiveTab] = useState('description')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return <div className="mt-12">
    <div className="border-b border-gray-300 mb-6">
      <div className="flex gap-8">
        <button
          className={`tab-button pb-2 px-1 text-sm font-medium ${activeTab === 'description' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('description')}
        >
          Description
        </button>
        <button
          className={`tab-button pb-2 px-1 text-sm font-medium text-gray-600 hover:text-amazon-orange ${activeTab === 'reviews' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('reviews')}
        >
          Reviews
        </button>
        <button
          className={`tab-button pb-2 px-1 text-sm font-medium text-gray-600 hover:text-amazon-orange ${activeTab === 'shop' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('shop')}
        >
          Shop Info
        </button>
      </div>
    </div>
    {/* Description Tab */}
    {activeTab === 'description' && <div id="description-tab" className="tab-content">
      <h2 className="text-xl font-bold mb-4">Product Description</h2>
      <Description description={product.description} />
    </div>}
    {activeTab === 'reviews' && <Review product={product} />}
    {/* Shop Info Tab */}
    {activeTab === 'shop' && <div id="shop-tab" className="tab-content">
      <h2 className="text-xl font-bold mb-4">Shop Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-2">Official Apple Store</h3>
          <p className="text-sm text-gray-600 mb-4">
            Authorized Apple reseller providing genuine products with official
            warranty.
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-bold">Rating:</span> 4.9/5 (2,450 reviews)
            </p>
            <p>
              <span className="font-bold">Products:</span> 156 items
            </p>
            <p>
              <span className="font-bold">Joined:</span>
              January 2020
            </p>
            <p>
              <span className="font-bold">Response Time:</span>
              Within 2 hours
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Policies</h3>
          <div className="space-y-2 text-sm">
            <p>
              <i
                data-lucide="check-circle"
                className="w-4 h-4 inline text-green-600 mr-1"
              />
              14-day return policy
            </p>
            <p>
              <i
                data-lucide="check-circle"
                className="w-4 h-4 inline text-green-600 mr-1"
              />
              1-year official warranty
            </p>
            <p>
              <i
                data-lucide="check-circle"
                className="w-4 h-4 inline text-green-600 mr-1"
              />
              Free shipping on orders over ৳50,000
            </p>
            <p>
              <i
                data-lucide="check-circle"
                className="w-4 h-4 inline text-green-600 mr-1"
              />
              Secure payment options
            </p>
          </div>
          <a
            href="shops.html"
            className="inline-block mt-4 text-amazon-blue hover:underline text-sm"
          >
            Visit Shop Page →
          </a>
        </div>
      </div>
    </div>}
  </div>
}