'use client'
import { AVAILABILITY, BRANDS, CATEGORIES, PRICE_RANGE } from "@/constants/filters"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent } from "react"

type Pagination = {
  totalCount: number
  totalPages: number
  currentPage: number
  limit: number
}
type Props = {
  pagination: Pagination
}
export const ResultHeader = ({ pagination }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const category = searchParams.get('category')
  const categories = category?.split(',') || []
  const brand = searchParams.get('brand')
  const brands = brand?.split(',') || []
  const customerReview = searchParams.get('customerReview')
  const priceRange = searchParams.get('priceRange')
  const availabilityParams = searchParams.get('availability')

  const resultsText: string[] = []

  if (categories.length > 0) {
    const categoriesBase = CATEGORIES.filter(category => categories.includes(category.value))
    resultsText.push(categoriesBase.map(category => category.name).join(','))
  }
  if (brands.length > 0) {
    const brandsBase = BRANDS.filter(brand => brands.includes(brand.value))
    resultsText.push(brandsBase.map(brand => brand.name).join(','))
  }
  if (customerReview) {
    resultsText.push(`${customerReview}`)
  }
  if (priceRange) {
    const priceRangeBase = PRICE_RANGE.find(priceRange => priceRange.value === priceRange.value)
    resultsText.push(priceRangeBase?.name || '')
  }
  if (availabilityParams) {
    const availabilityBase = AVAILABILITY.find(availability => availability.value === availabilityParams)
    resultsText.push(availabilityBase?.name || '')
  }

  const handelSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const params = new URLSearchParams(searchParams)
    params.set('sort', value)
    router.push(`?${params.toString()}`, { scroll: false })

  }

  return <div className="flex justify-between items-center mb-4 shadow-sm border-b pb-2">
    <div className="text-sm">
      <span>{pagination.currentPage}-{pagination.totalPages} of over {pagination.totalCount} {resultsText.length > 0 && 'results for'}</span>
      {resultsText.length > 0 && <span className="font-bold text-amazon-orange">&quot;{resultsText.join(',')}&quot; </span>}
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm">Sort by:</span>
      <select className="text-sm bg-gray-100 border border-gray-300 rounded px-2 py-1 shadow-sm focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary" onChange={handelSort}>
        <option value="featured">Featured</option>
        <option value="price-low-to-high">Price: Low to High</option>
        <option value="price-high-to-low">Price: High to Low</option>
        <option value="rating">Avg. Customer Review</option>
        <option value="newest">Newest Arrivals</option>
      </select>
    </div>
  </div>
}