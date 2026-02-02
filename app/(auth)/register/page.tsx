"use client"
import { handleRegister } from "@/services/auth/register";
import { Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";

export default function RegisterPage() {
  const [userType, setUserType] = useState<'customer' | 'seller'>('customer')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleUserType = (type: 'customer' | 'seller') => {
    setUserType(type)
  }

  return <div className="w-full max-w-[350px] p-6 a-box mb-6">
    <h1 className="text-2xl font-normal mb-4">Create account</h1>
    <form action={async (formData) => {
      startTransition(async () => {
        setError(null)
        setSuccess(null)

        const result = await handleRegister(formData)
        if (result?.error) {
          setError(result.error)
          return
        }

        const email = String(formData.get("email") || "")
        const password = String(formData.get("password") || "")
        const loginResult = await signIn("credentials", {
          email,
          password,
          redirect: false
        })

        if (loginResult?.error) {
          setSuccess("Account created. Please sign in.")
          router.push("/login")
          return
        }

        setSuccess("Account created. Redirecting...")
        router.push("/")
      })
    }} className="space-y-4">
      {/* Account Type Toggle */}
      <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-sm">
        <button
          type="button"
          id="customerTab"
          className={`flex-1 py-1 text-xs font-bold ${userType === 'customer' ? 'bg-white shadow-sm rounded-sm' : 'bg-gray-100 rounded-sm'}`}
          onClick={() => handleUserType('customer')}
        >
          Customer
        </button>
        <button
          type="button"
          id="shopOwnerTab"
          className={`flex-1 py-1 text-xs font-bold ${userType === 'seller' ? 'bg-white shadow-sm rounded-sm' : 'bg-gray-100 rounded-sm'}`}
          onClick={() => handleUserType('seller')}
        >
          Shop Owner
        </button>
        <input
          type="hidden"
          name="userType"
          id="userType"
          value={userType}
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-bold mb-1">
          Your name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="First and last name"
          className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
        />
      </div>
      {/* Shop Name (Only for Shop Owner) */}
      {userType === 'seller' && <div id="shopNameField" >
        <label htmlFor="shopName" className="block text-sm font-bold mb-1">
          Shop name
        </label>
        <input
          type="text"
          id="shopName"
          name="shopName"
          required
          placeholder="Your shop name"
          className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
        />
      </div>}
      <div>
        <label htmlFor="mobile" className="block text-sm font-bold mb-1">
          Mobile number
        </label>
        <div className="flex gap-2">
          <select className="px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary">
            <option>BD +880</option>
          </select>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            required
            placeholder="Mobile number"
            className="flex-1 px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-bold mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="At least 6 characters"
          className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
        />
        <p className="text-xs text-gray-600 mt-1">
          <i data-lucide="info" className="w-3 h-3 inline mr-1" />
          Passwords must be at least 6 characters.
        </p>
      </div>
      <div>
        <label htmlFor="passwordConfirm" className="block text-sm font-bold mb-1">
          Re-enter password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          required
          className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {success && <p className="text-xs text-green-600">{success}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-1.5 a-button-primary text-sm font-medium rounded-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Create your Gadgets BD account
      </button>
    </form>
    <div className="mt-4 text-xs">
      <p>
        By creating an account, you agree to Gadgets BD&apos;s
        <a href="#" className="text-amazon-blue hover:underline">
          Conditions of Use
        </a>
        and
        <a href="#" className="text-amazon-blue hover:underline">
          Privacy Notice
        </a>
        .
      </p>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-300">
      <p className="text-sm">
        Already have an account?
        <Link
          href="/login"
          className="text-amazon-blue hover:text-amazon-orange hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
    {/* Shop Owner Info */}
    <div
      id="shopOwnerInfo"
      className={`${userType === "seller" ? "block" : "hidden"} mt-4 p-3 bg-blue-50 border border-blue-200 rounded-sm`}
    >
      <div className="flex gap-2">
        <Info
          data-lucide="info"
          className="w-4 h-4 text-blue-600 shrink-0 mt-0.5"
        />
        <div className="text-xs text-blue-900">
          <p className="font-bold mb-1">Shop Owner Registration</p>
          <p>
            After registration, you&apos;ll be able to set up your shop profile, add
            products, and start selling on Gadgets BD marketplace.
          </p>
        </div>
      </div>
    </div>
  </div>

}