import { CartItem } from "@/components/cart/cart-item";
import { Product } from "@/types/product";
import { cookies } from "next/headers";
import Link from "next/link";
type CartProduct = {
  product: Product
  quantity: number
}
export const getCart = async () => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('cart_session')?.value
  const response = await fetch(`${process.env.BASE_URL}/api/cart`, {
    headers: {
      'sessionId': sessionId ?? ''
    }
  })
  const data = await response.json()
  return data
}
export default async function CartPage() {
  const cart = await getCart()
  const products = cart?.data?.products

  const total = products?.reduce((acc: number, product: CartProduct) => acc + product.product.price * product.quantity, 0)
  const totalItems = products?.reduce((acc: number, product: CartProduct) => acc + product.quantity, 0)
  return <main className="flex-1  max-w-[1500px] mx-auto w-full p-4">
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Cart Items */}
      <div className="flex-1">
        {/* Cart Header */}
        <div className="bg-white p-4 mb-4 border-b border-gray-300">
          <h1 className="text-2xl font-normal mb-2">Shopping Cart</h1>
          <div className="text-sm text-gray-600">
            <Link href="/products" className="text-amazon-blue hover:underline">
              Continue shopping
            </Link>
          </div>
        </div>
        {/* Cart Items List */}
        <div className="bg-white">
          {/* Item 1 */}
          {
            products?.map((product: CartProduct) => (
              <CartItem
                key={product.product._id}
                item={product.product}
                qty={product.quantity}
              />))
          }


          {/* Subtotal */}
          <div className="p-4 text-right">
            <p className="text-lg">
              Subtotal ({totalItems} items):
              <span className="font-bold text-amazon-orange">৳{total}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Order Summary Sidebar */}
      <div className="lg:w-80">
        <div className="bg-white p-4 border border-gray-300 rounded">
          <div className="mb-4">
            <p className="text-sm mb-2">
              <i
                data-lucide="check-circle"
                className="w-4 h-4 inline text-green-600 mr-1"
              />
              <span className="text-green-700 font-medium">
                Your order qualifies for FREE Shipping!
              </span>
            </p>
          </div>
          <div className="mb-4">
            <p className="text-lg mb-1">
              Subtotal ({totalItems} items):
              <span className="font-bold text-amazon-orange">৳{total}</span>
            </p>
            <div className="flex items-start gap-2 text-xs">
              <input type="checkbox" id="gift" className="mt-0.5" />
              <label htmlFor="gift" className="text-gray-700">
                This order contains a gift
              </label>
            </div>
          </div>
          <Link
            href={'checkout'}
            className="w-full py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors mb-2 block text-center"
          >
            Proceed to Checkout
          </Link>
          <div className="text-xs text-gray-600 mt-4">
            <p className="mb-2">
              <i data-lucide="shield-check" className="w-3 h-3 inline mr-1" />
              Secure transaction
            </p>
            <p>
              <i data-lucide="truck" className="w-3 h-3 inline mr-1" />
              Ships from Gadgets BD
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>

}