import { getCart } from "@/app/(guest)/cart/page";
import { Address } from "./_components/address";
import Image from "next/image";
import { Product } from "@/types/product";
export type CartProduct = {
  product: Product
  quantity: number
}
export default async function CheckoutPage() {
  const cart = await getCart()
  const products = cart.data.products
  const total = products.reduce((acc: number, product: CartProduct) => acc + product.product.price * product.quantity, 0)
  const totalItems = products.reduce((acc: number, product: CartProduct) => acc + product.quantity, 0)
  return <main className="checkout-container flex-1 py-10 px-4 flex flex-col lg:flex-row gap-8">
    {/* Left Side: Steps */}
    <div className="flex-1 space-y-6">
      {/* 1. Shipping Address Summary */}
      <Address />
      {/* 2. Selected Products List */}
      <div className="pb-6 border-b border-gray-300">
        <div className="flex items-center mb-4">
          <span className="section-number mr-4">2</span>
          <span className="font-bold text-lg">Review items</span>
        </div>
        <div className="box p-4 space-y-4">
          {/* Product 1 */}
          {cart.data.products.map((product: CartProduct) => <div key={product.product._id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
            <div className="w-24 h-24 bg-gray-50 flex items-center justify-center shrink-0">
              <Image
                width={96}
                height={96}
                alt=""
                src={product.product.defaultImage}
                className="h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-1">
                {product.product.productName}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                Sold by: Official {product.product.brand} Store
              </p>
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-amazon-orange">৳{product.product.price * product.quantity}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span>Qty:</span>
                  <select value={product.quantity} className="border border-gray-300 rounded px-2 py-0.5">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>)}

        </div>
      </div>
      {/* 3. Payment Method */}
      <div className="pb-6">
        <div className="flex items-center mb-6">
          <span className="section-number mr-4">3</span>
          <span className="font-bold text-lg text-amazon-orange">
            Choose a payment method
          </span>
        </div>
        <form
          action="success.html"
          method="POST"
          id="paymentForm"
          className="box p-6 space-y-6 shadow-sm"
        >
          <div className="space-y-4">
            <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-amazon-background transition-colors bg-gray-50 border-amazon-orange ring-1 ring-amazon-orange">
              <div>
                <span className="font-bold block text-sm">
                  Credit or Debit Card
                </span>
                <div className="flex gap-2 mt-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    className="h-4"
                    alt="Visa"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    className="h-4"
                    alt="Mastercard"
                  />
                </div>
              </div>
            </label>
            <div id="cardInputs" className="pl-8 space-y-4">
              <div>
                <label className="text-xs font-bold block mb-1">
                  Name on card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full max-w-sm px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-xs font-bold block mb-1">
                    Card number
                  </label>
                  <input
                    type="text"
                    placeholder="#### #### #### ####"
                    className="w-full px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
                  />
                </div>
                <div className="w-24">
                  <label className="text-xs font-bold block mb-1">CVV</label>
                  <input
                    type="password"
                    placeholder="***"
                    className="w-full px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">
                  Expiration date
                </label>
                <div className="flex gap-2">
                  <select className="bg-gray-100 border border-gray-300 rounded p-1 text-xs">
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                  <select className="bg-gray-100 border border-gray-300 rounded p-1 text-xs">
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                    <option>2030</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="h-px bg-gray-200" />
          </div>
        </form>
      </div>
    </div>
    {/* Right Side: Order Summary */}
    <div className="w-full lg:w-[300px]">
      <div className="box p-4 sticky top-10">
        <button

          className="w-full py-2 mb-4 rounded-md btn-primary text-sm font-normal shadow-sm"
        >
          Place your order
        </button>
        <p className="text-[10px] text-gray-500 text-center mb-4 border-b border-gray-300 pb-4 leading-tight">
          By placing your order, you agree to Gadgets BD&apos;s
          <a
            href="#"
            className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
          >
            privacy notice
          </a>
          and
          <a
            href="#"
            className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
          >
            conditions of use
          </a>
          .
        </p>
        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Items ({totalItems}):</span>
            <span>৳{total}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span className="text-green-600 font-bold">FREE</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span>Service Fee:</span>
            <span>৳500</span>
          </div>
          <div className="flex justify-between text-amazon-orange text-lg font-bold pt-2">
            <span>Order Total:</span>
            <span>৳{total}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 text-xs">
          <p className="text-green-600 font-bold mb-2">
            <i data-lucide="truck" className="w-4 h-4 inline mr-1" />
            FREE Delivery on orders over ৳50,000
          </p>
          <p className="text-gray-600">
            <i data-lucide="shield-check" className="w-4 h-4 inline mr-1" />
            Secure checkout
          </p>
        </div>
      </div>
    </div>
  </main>

}