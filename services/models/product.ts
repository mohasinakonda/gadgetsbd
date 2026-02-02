import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    required: false
  },
  availability: {
    type: String,
    enum: ['In Stock', 'Out of Stock', 'Pre-Order'],
    default: 'In Stock'
  },
  warranty: {
    type: String,
    required: true
  },

  defaultImage: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: false
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  processor: {
    type: String,
    required: false
  },
  ram: {
    type: String,
    required: false
  },
  storage: {
    type: String,
    required: false
  },
  displaySize: {
    type: String,
    required: false
  },
  otherSpecifications: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Product = mongoose.models.ProductList || mongoose.model('ProductList', productsSchema)