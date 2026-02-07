import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false
  },
  sessionID: {
    type: String,
    index: true,
    required: false
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductList',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ]
})

export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema)