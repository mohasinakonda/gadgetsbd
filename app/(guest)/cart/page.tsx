export default function CartPage() {

  return <main className="flex-1  max-w-[1500px] mx-auto w-full p-4">
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Cart Items */}
      <div className="flex-1">
        {/* Cart Header */}
        <div className="bg-white p-4 mb-4 border-b border-gray-300">
          <h1 className="text-2xl font-normal mb-2">Shopping Cart</h1>
          <div className="text-sm text-gray-600">
            <a href="products.html" className="text-amazon-blue hover:underline">
              Continue shopping
            </a>
          </div>
        </div>
        {/* Cart Items List */}
        <div className="bg-white">
          {/* Item 1 */}
          <div className="p-4 border-b border-gray-300 flex gap-4 hover:bg-gray-50">
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1517336712461-481140081023?w=300"
                className="w-full h-full object-cover rounded border border-gray-200"
                alt="Product"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-base mb-1">
                <a
                  href="details.html"
                  className="text-amazon-blue hover:text-amazon-orange hover:underline"
                >
                  Apple MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD
                </a>
              </h3>
              <p className="text-sm text-green-700 font-medium">In Stock</p>
              <p className="text-xs text-gray-600 mt-1">
                Sold by: Official Apple Store
              </p>
              <p className="text-xs text-gray-600">Eligible for FREE Shipping</p>
              <div className="flex items-center gap-4 mt-3">
                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600">Qty:</label>
                  <select className="border border-gray-400 rounded-md px-2 py-1 text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-amazon-blue">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <span className="text-gray-300">|</span>
                {/* Delete Button */}
                <button className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline">
                  Delete
                </button>
                <span className="text-gray-300">|</span>
                {/* Save for Later */}
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-amazon-orange">৳3,45,000</p>
            </div>
          </div>
          {/* Item 2 */}
          <div className="p-4 border-b border-gray-300 flex gap-4 hover:bg-gray-50">
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
                className="w-full h-full object-cover rounded border border-gray-200"
                alt="Product"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-base mb-1">
                <a
                  href="details.html"
                  className="text-amazon-blue hover:text-amazon-orange hover:underline"
                >
                  Sony WH-1000XM5 Wireless Noise Canceling Headphones
                </a>
              </h3>
              <p className="text-sm text-green-700 font-medium">In Stock</p>
              <p className="text-xs text-gray-600 mt-1">Sold by: Sony Official</p>
              <p className="text-xs text-gray-600">Eligible for FREE Shipping</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600">Qty:</label>
                  <select className="border border-gray-400 rounded-md px-2 py-1 text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-amazon-blue">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <span className="text-gray-300">|</span>
                <button className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline">
                  Delete
                </button>
                <span className="text-gray-300">|</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-amazon-orange">৳38,500</p>
            </div>
          </div>
          {/* Item 3 */}
          <div className="p-4 border-b border-gray-300 flex gap-4 hover:bg-gray-50">
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300"
                className="w-full h-full object-cover rounded border border-gray-200"
                alt="Product"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-base mb-1">
                <a
                  href="details.html"
                  className="text-amazon-blue hover:text-amazon-orange hover:underline"
                >
                  Razer BlackWidow V4 Pro Mechanical Gaming Keyboard
                </a>
              </h3>
              <p className="text-sm text-green-700 font-medium">In Stock</p>
              <p className="text-xs text-gray-600 mt-1">Sold by: Razer Store</p>
              <p className="text-xs text-gray-600">Eligible for FREE Shipping</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600">Qty:</label>
                  <select className="border border-gray-400 rounded-md px-2 py-1 text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-amazon-blue">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <span className="text-gray-300">|</span>
                <button className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline">
                  Delete
                </button>
                <span className="text-gray-300">|</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-amazon-orange">৳18,500</p>
            </div>
          </div>
          {/* Subtotal */}
          <div className="p-4 text-right">
            <p className="text-lg">
              Subtotal (3 items):
              <span className="font-bold text-amazon-orange">৳4,02,000</span>
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
              Subtotal (3 items):
              <span className="font-bold text-amazon-orange">৳4,02,000</span>
            </p>
            <div className="flex items-start gap-2 text-xs">
              <input type="checkbox" id="gift" className="mt-0.5" />
              <label htmlFor="gift" className="text-gray-700">
                This order contains a gift
              </label>
            </div>
          </div>
          <button
            // onclick="
            //               window.location.href = 'paymentProcess.html'
            //           "
            className="w-full py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors mb-2"
          >
            Proceed to Checkout
          </button>
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