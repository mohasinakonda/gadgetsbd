import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  password: {
    type: String,
    required: true
  },
  profile_image: {
    type: String,
    required: false
  },
  shopName: {
    type: String,
    required: false
  },
  userType: {
    type: String,
    enum: ['customer', 'seller'],
    default: 'customer'
  }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)