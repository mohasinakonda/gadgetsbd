import { CheckCircle, ChevronRight, Download, Truck, Upload, XCircle } from "lucide-react";

export default function OrdersPage() {

  return <main className="bg-white max-w-[1000px] mx-auto w-full p-4 py-6">
    <div className="flex items-center gap-2 text-sm mb-4">
      <a href="#" className="text-amazon-blue hover:underline">
        Your Account
      </a>
      <ChevronRight data-lucide="chevron-right" className="w-3 h-3 text-gray-400" />
      <span className="text-amazon-orange">Your Orders</span>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h1 className="text-3xl font-normal">Your Orders</h1>
    </div>
    <div className="text-sm mb-6 flex items-center gap-1">
      <span className="font-bold">2 orders</span>
      <span>placed in</span>
      <select className="bg-gray-100 border border-gray-300 rounded shadow-sm px-2 py-1 text-xs outline-none hover:bg-gray-200">
        <option>past 3 months</option>
        <option>2024</option>
        <option>2023</option>
      </select>
    </div>
    {/* Orders List */}
    <div className="space-y-6">
      {/* Order 1 */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Order Header */}
        <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center text-xs text-gray-600 border-b border-gray-300">
          <div className="flex gap-10">
            <div>
              <div className="uppercase tracking-tighter">Order Placed</div>
              <div className="font-normal text-sm text-gray-900 mt-1">
                January 20, 2025
              </div>
            </div>
            <div>
              <div className="uppercase tracking-tighter">Total</div>
              <div className="font-normal text-sm text-gray-900 mt-1">
                ৳4,02,500
              </div>
            </div>
            <div>
              <div className="uppercase tracking-tighter">Ship to</div>
              <div className="font-normal text-sm text-amazon-blue mt-1 hover:underline cursor-pointer">
                John Doe
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="uppercase tracking-tighter mb-1">
              Order # GB-2025-001234
            </div>
            <a href="#" className="text-amazon-blue hover:underline">
              View order details
            </a>
          </div>
        </div>
        {/* Order Body */}
        <div className="p-6 space-y-6">
          {/* Product 1 */}
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=200"
              className="w-32 h-32 object-cover border border-gray-200 rounded"
            />
            <div className="flex-1">
              <a
                href="details.html"
                className="text-amazon-blue hover:underline font-bold text-sm"
              >
                Apple MacBook Pro 16 M2 Max - 32GB RAM, 1TB SSD
              </a>
              <p className="text-xs text-gray-600 mt-1">
                Sold by: Official Apple Store
              </p>
              <p className="text-xs text-gray-600 mt-1">Quantity: 1</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  <CheckCircle data-lucide="check-circle" className="w-3 h-3 inline mr-1" />
                  Delivered
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  // onclick="window.print()"
                  className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 flex items-center gap-1"
                >
                  <Download data-lucide="download" className="w-3 h-3" />
                  Download Invoice
                </button>
                <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50">
                  Write a Review
                </button>
                <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50">
                  Buy it again
                </button>
              </div>
            </div>
          </div>
          {/* Product 2 */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
              className="w-32 h-32 object-cover border border-gray-200 rounded"
            />
            <div className="flex-1">
              <a
                href="details.html"
                className="text-amazon-blue hover:underline font-bold text-sm"
              >
                Sony WH-1000XM5 Wireless Noise Canceling Headphones
              </a>
              <p className="text-xs text-gray-600 mt-1">Sold by: Sony Official</p>
              <p className="text-xs text-gray-600 mt-1">Quantity: 1</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  <CheckCircle data-lucide="check-circle" className="w-3 h-3 inline mr-1" />
                  Delivered
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  // onclick="window.print()"
                  className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 flex items-center gap-1"
                >
                  <i data-lucide="download" className="w-3 h-3" />
                  Download Invoice
                </button>
                <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50">
                  Write a Review
                </button>
                <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50">
                  Buy it again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Order 2 */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Order Header */}
        <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center text-xs text-gray-600 border-b border-gray-300">
          <div className="flex gap-10">
            <div>
              <div className="uppercase tracking-tighter">Order Placed</div>
              <div className="font-normal text-sm text-gray-900 mt-1">
                January 15, 2025
              </div>
            </div>
            <div>
              <div className="uppercase tracking-tighter">Total</div>
              <div className="font-normal text-sm text-gray-900 mt-1">
                ৳18,500
              </div>
            </div>
            <div>
              <div className="uppercase tracking-tighter">Ship to</div>
              <div className="font-normal text-sm text-amazon-blue mt-1 hover:underline cursor-pointer">
                John Doe
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="uppercase tracking-tighter mb-1">
              Order # GB-2025-001233
            </div>
            <a href="#" className="text-amazon-blue hover:underline">
              View order details
            </a>
          </div>
        </div>
        {/* Order Body */}
        <div className="p-6">
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200"
              className="w-32 h-32 object-cover border border-gray-200 rounded"
            />
            <div className="flex-1">
              <a
                href="details.html"
                className="text-amazon-blue hover:underline font-bold text-sm"
              >
                Razer BlackWidow V4 Pro Mechanical Gaming Keyboard
              </a>
              <p className="text-xs text-gray-600 mt-1">Sold by: Razer Store</p>
              <p className="text-xs text-gray-600 mt-1">Quantity: 1</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                  <Truck data-lucide="truck" className="w-3 h-3 inline mr-1" />
                  Shipped
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  // onclick="window.print()"
                  className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 flex items-center gap-1"
                >
                  <Download data-lucide="download" className="w-3 h-3" />
                  Download Invoice
                </button>
                <button className="px-4 py-1.5 border border-red-300 bg-red-50 text-red-700 rounded-md text-xs hover:bg-red-100 flex items-center gap-1">
                  <XCircle data-lucide="x-circle" className="w-3 h-3" />
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

}