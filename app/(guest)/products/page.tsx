import { Rating } from "@/components/products/rating"
import { ResultHeader } from "@/components/products/result-header"
import { Sidebar } from "@/components/products/sidebar"
import { Product } from "@/types/product"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
const getProducts = async (searchParams?: Promise<{ [key: string]: string }>) => {
  const params = await searchParams
  const response = await fetch(`${process.env.BASE_URL}/api/products?${new URLSearchParams(params).toString()}`)
  const data = await response.json()

  return data
}
type Props = {
  searchParams: Promise<{ [key: string]: string }>
}
const ProductPage = async ({ searchParams }: Props) => {
  const data = await getProducts(searchParams)
  const products = data?.data ?? []
  return <main className="flex-1 max-w-[1500px] mx-auto w-full p-4 bg-white">
    {/* Results Header */}
    <ResultHeader pagination={data?.pagination} />
    <div className="flex gap-6">
      {/* Sidebar Filters */}
      <Sidebar />
      {/* Product Grid */}
      <div className="flex-1">
        <div className="space-y-4">
          {/* Product 1 */}
          {products.map((product: Product) => {
            const additionalInfo = [product.processor, product.ram, product.displaySize, product.storage]
              .filter(Boolean)
              .join(' | ')


            return <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="flex gap-4 p-4 border rounded hover:shadow-md transition"
            >
              <div className="w-48 h-48 shrink-0 bg-gray-50 flex items-center justify-center">
                <Image
                  width={192}
                  height={192}
                  src={product.defaultImage}
                  alt={product.productName}
                  className="h-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-amazon-blue hover:text-amazon-orange font-normal mb-1">
                  {product.productName}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <Rating avgRating={product.averageRating} />
                  <span className="text-sm text-amazon-blue">{product.reviewCount > 0 ? product.reviewCount : '(no review)'}</span>
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-normal">৳{product.price}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  FREE delivery <strong>Tomorrow</strong>
                </p>
                <p className="text-xs text-gray-500">
                  {additionalInfo}
                </p>
              </div>
            </Link>
          })}

        </div>
      </div>
    </div>
  </main>


}

export default ProductPage