import mongoose from "mongoose"


const MONGODB_URI = process.env.MONGO_URI

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined")
}

export const connectDB = async () => {
  const conn = await mongoose.connect(MONGODB_URI)
  if (conn.connection.readyState === 1) {
    console.log('db connected',)
  } else {
    console.log('db not connected')
  }
  return conn
}