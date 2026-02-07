export type Review = {
  _id: string
  rating: number
  title?: string
  image?: string
  userName?: string
  comment?: string
  product: string
  user?: string
  createdAt: Date | string
}
export type Product = {
  _id: string
  productName: string
  category: string
  brand: string
  condition: string
  description: string
  price: number
  stock: number
  warranty: string
  defaultImage: string
  images: string[]
  slug: string
  isActive: boolean
  processor: string
  ram: string
  storage: string
  displaySize: string
  otherSpecifications: string
  createdAt: Date
  reviews: Review[]
  averageRating: number
  reviewCount: number
  availability: string

}