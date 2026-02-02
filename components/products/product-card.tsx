import { Product } from "@/types/product"
import Image from "next/image"
import Link from "next/link"
type Props = {
  product: Product
}
export const ProductCard = ({ product }: Props) => {

  return <div className="flex-none w-48">
    <Link href={`/products/${product.slug}`}>
      <div className="bg-gray-50 h-48 flex items-center justify-center mb-2 p-2">
        <Image
          width={192}
          height={192}
          alt={product.productName}
          src={product.defaultImage}
          className="h-full object-cover mix-blend-multiply"
        />
      </div>
      <div className="text-sm hover:text-amazon-orange text-amazon-blue line-clamp-2">
        {product.productName}
      </div>
    </Link>
    <div className="text-xs text-gray-500">Official Apple Store</div>
    <div className="mt-1">
      <span className="text-xs align-top">৳</span>
      <span className="text-xl font-bold">{product.price}</span>
    </div>
    <div className="text-xs text-gray-500 mb-2">Get it by Tomorrow</div>
    <button className="w-full bg-amazon-yellow hover:bg-amazon-yellow_hover text-sm py-1.5 rounded-md shadow-sm font-medium border border-amazon-secondary transition-colors">
      Add to Cart
    </button>
  </div>
}