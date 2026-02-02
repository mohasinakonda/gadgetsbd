"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return <>
    <div className="w-full max-w-[350px] p-6 a-box mb-6">
      <h1 className="text-2xl font-normal mb-4">Sign in</h1>
      <form action={async (formData) => {
        startTransition(async () => {
          setError(null)
          const email = String(formData.get("email") || "")
          const password = String(formData.get("password") || "")
          const result = await signIn("credentials", {
            email,
            password,
            redirect: false
          })
          if (result?.error) {
            setError("Invalid email or password.")
            return
          }
          router.push("/")
        })
      }} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-bold mb-1">
            Email or mobile phone number
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
          <div className="flex justify-between mb-1">
            <label htmlFor="password" className="text-sm font-bold">
              Password
            </label>
            <a
              href="#"
              className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full  py-1.5 a-button-primary text-sm font-medium rounded-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Sign in
        </button>
      </form>
      <div className="mt-4 text-xs">
        <p>
          By continuing, you agree to Gadgets BD's
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
      <div className="mt-4">
        <a
          href="#"
          className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline flex items-center gap-1"
        >
          <i data-lucide="chevron-right" className="w-3 h-3" />
          Need help?
        </a>
      </div>
    </div>
    {/* Divider */}
    <div className="w-full max-w-[350px] mb-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-gray-500">New to Gadgets BD?</span>
        </div>
      </div>
    </div>
    {/* Create Account Button */}
    <div className="w-full max-w-[350px] mb-8">
      <a
        href="/register"
        className="block w-full py-1.5 border border-gray-400 rounded-sm text-center text-sm hover:bg-gray-50 transition-colors"
      >
        Create your Gadgets BD account
      </a>
    </div>
  </>


}