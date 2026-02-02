'use server'

import { randomBytes, scryptSync } from "crypto"
import { connectDB } from "../connection"
import { User } from "../models/users"

export const handleRegister = async (formData: FormData) => {
  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").toLowerCase().trim()
  const phone = String(formData.get("mobile") || "").trim()
  const password = String(formData.get("password") || "")
  const passwordConfirm = String(formData.get("passwordConfirm") || "")
  const userType = String(formData.get("userType") || "customer")
  const shopName = String(formData.get("shopName") || "").trim()

  if (!name || !email || !password || !passwordConfirm) {
    return { error: "All required fields must be filled." }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." }
  }

  if (password !== passwordConfirm) {
    return { error: "Passwords do not match." }
  }

  if (userType === "seller" && !shopName) {
    return { error: "Shop name is required for sellers." }
  }

  await connectDB()
  const existingUser = await User.findOne({ email }).lean()
  if (existingUser) {
    return { error: "An account with this email already exists." }
  }

  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 64).toString("hex")
  const passwordHash = `${salt}:${hash}`

  await User.create({
    name,
    email,
    phone,
    password: passwordHash,
    userType,
    shopName: userType === "seller" ? shopName : undefined
  })

  return { success: "User registered successfully" }
}