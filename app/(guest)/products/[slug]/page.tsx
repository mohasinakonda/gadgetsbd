import { handleAddToCart } from "@/actions/add-to-cart"
import { SubmitButton } from "@/components/common/submit-button"
import { Description } from "@/components/products/description"
import { ProductInfo } from "@/components/products/product-info"
import { ImageGallery } from "@/components/products/product-info/image-gallery"
import { Rating } from "@/components/products/rating"
import { RelatedProduct } from "@/components/products/related-product"
import { Product } from "@/types/product"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const getProduct = async (slug: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/products/${slug}`)
    const data = await response.json()
    return data
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log('error', e.message)
    }

  }
}
type Props = {
  params: Promise<{ slug: string }>
}
const ProductDetailPage = async ({ params }: Props) => {
  const { slug } = await params
  const data = await getProduct(slug)
  const product: Product = data?.data ?? {}

  return <main className="flex-1 bg-white max-w-[1500px] mx-auto w-full p-4">
    {/* Breadcrumbs */}
    <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
      <a href="index.html" className="hover:underline">
        Home
      </a>
      <ChevronRight data-lucide="chevron-right" className="w-3 h-3" />
      <a href="products.html" className="hover:underline">
        Electronics
      </a>
      <ChevronRight data-lucide="chevron-right" className="w-3 h-3" />
      <a href="products.html" className="hover:underline">
        Laptops &amp; Computers
      </a>
      <i data-lucide="chevron-right" className="w-3 h-3" />
      <span className="text-amazon-text font-bold">MacBook Pro</span>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: Image Gallery */}
      <ImageGallery
        images={product.images}
        defaultImage={product.defaultImage}
      />
      {/* Center: Product Info */}
      <div className="lg:col-span-4">
        <h1 className="text-2xl font-normal mb-2">
          {product.productName}
        </h1>
        <p className="text-sm text-gray-600 mb-3">
          Visit the {' '}
          <Link href={`/shops/${product.brand}`}
            target="_blank"
            className="text-amazon-blue hover:underline">
            {product.brand} Store
          </Link>
        </p>
        <div className="flex items-center gap-2 mb-4">
          <Rating avgRating={product.averageRating} />
          <span className="text-sm text-amazon-blue hover:underline cursor-pointer">
            {product.reviewCount} ratings
          </span>
        </div>
        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sm">Price:</span>
            <span className="text-3xl text-amazon-orange">৳{product.price}</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">Inclusive of all taxes</p>
        </div>
        <div className="border-t border-gray-200 pt-4 mb-4">
          <h3 className="font-bold text-base mb-2">About this item</h3>
          {/* <MDEditor.Markdown source={product.description} /> */}
          <Description description={product.description} />
        </div>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm mb-2">
            <span className="font-bold">Category:</span> {product.category}
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold">Brand:</span> {product.brand}
          </p>
          <p className="text-sm">
            <span className="font-bold">Stock:</span>
            <span className="text-green-600 font-semibold">
              {product.stock} units available
            </span>
          </p>
        </div>
      </div>
      {/* Right: Buy Box */}
      <div className="lg:col-span-3">

        <div className="border border-gray-200 rounded p-4">
          <div className="text-3xl text-amazon-orange mb-2">৳{product.price}</div>
          <p className="text-sm mb-3">
            <span className="font-bold">FREE delivery</span>
            <strong>Tomorrow</strong>
          </p>
          <p className="text-green-600 font-bold text-sm mb-4">In Stock</p>
          <form action={handleAddToCart}>
            <input type="hidden" name="productId" value={product._id} />
            <div className="mb-4">
              <label className="text-sm font-bold block mb-2">Quantity:</label>
              <select name="quantity" className="border border-gray-300 rounded px-3 py-1 text-sm w-20">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <SubmitButton />
          </form>
          <button className="w-full bg-amazon-secondary hover:bg-amazon-secondary_hover py-2 rounded-md shadow-sm text-sm font-medium text-white">
            Buy Now
          </button>
          <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
            <p className="mb-1">
              <i data-lucide="shield-check" className="w-4 h-4 inline mr-1" />
              Secure transaction
            </p>
            <p className="mb-1">
              <i data-lucide="truck" className="w-4 h-4 inline mr-1" />
              Ships from Gadgets BD
            </p>
            <p>
              <i data-lucide="package" className="w-4 h-4 inline mr-1" />
              Sold by Official {product.brand} Store
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* Tabs Section */}
    <ProductInfo product={product} />
    {/* Related Products */}
    <RelatedProduct />
  </main>

}

export default ProductDetailPage