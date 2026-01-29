import { User } from "lucide-react"
import Link from "next/link"

export const SellerNav = () => {

  return <nav className="bg-amazon text-white p-3 shadow-md">
    <div className="max-w-[1500px] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tighter">
            gadgets<span className="italic text-amazon-secondary">BD</span>
            <span className="text-sm font-normal ml-2 bg-gray-700 px-2 py-0.5 rounded">
              seller central
            </span>
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4 text-sm font-medium">
        <Link
          href="/manage-listing"
          className="underline decoration-amazon-secondary decoration-2 underline-offset-4"
        >
          Catalog
        </Link>
        <Link href="/orders" className="hover:underline">
          Orders
        </Link>
        <div className="h-4 w-px bg-gray-600" />
        <div className="flex items-center gap-1 cursor-pointer">
          <User data-lucide="user" className="w-4 h-4" />
          <span>Shop Owner</span>
        </div>
      </div>
    </div>
  </nav>

}