import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: String,
  userName: {
    type: String,
    default: "Anonymous"
  },
  image: {
    type: String,
    required: false
  },
  comment: {
    type: String,
    required: false
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
}, { timestamps: true })

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)