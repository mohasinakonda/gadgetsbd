'use client'

import { AVAILABILITY, BRANDS, CATEGORIES, CONDITION, PRICE_RANGE } from "@/constants/filters"
import { Star } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent } from "react"

type Checkbox = {
  label: string,
  value: string,
  checked: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const Checkbox = ({ label, value, checked, onChange }: Checkbox) => {

  return <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
    <input
      type="checkbox"
      className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
      checked={checked}
      value={value}
      onChange={onChange}
    />
    <span className="text-sm">{label}</span>
  </label>
}


export const Sidebar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const categories = category?.split(',') || []

  const brand = searchParams.get('brand')
  const brands = brand?.split(',') || []
  const customerReview = searchParams.get('customerReview')
  const priceRange = searchParams.get('priceRange')
  const availabilityParams = searchParams.get('availability')
  const conditionParams = searchParams.get('condition')

  const searchQuery = new URLSearchParams(searchParams)
  const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      categories.push(value)
      searchQuery.set('category', categories.join(','))
    } else {
      const filterCategories = categories.filter((category) => category !== value)
      if (filterCategories.length > 0) {
        searchQuery.set('category', filterCategories.join(','))
      } else {
        searchQuery.delete('category')
      }
    }
    router.push(`?${searchQuery.toString()}`, { scroll: false })
  }

  const handleBrand = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      brands.push(value)
      searchQuery.set('brand', brands.join(','))
    } else {
      const filterBrands = brands.filter((brand) => brand !== value)
      if (filterBrands.length > 0) {
        searchQuery.set('brand', filterBrands.join(','))
      } else {
        searchQuery.delete('brand')
      }
    }
    router.push(`?${searchQuery.toString()}`, { scroll: false })
  }

  const handleCustomerReview = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      searchQuery.set('customerReview', value)
    } else {
      searchQuery.delete('customerReview')
    }
    router.push(`?${searchQuery.toString()}`, { scroll: false })
  }

  const handlePriceRange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      searchQuery.set('priceRange', value);
    } else {
      searchQuery.delete('priceRange');
    }
    router.push(`?${searchQuery.toString()}`, { scroll: false })
  }

  const handleAvailability = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      searchQuery.set('availability', value);
    } else {
      searchQuery.delete('availability');
    }
    router.push(`?${searchQuery.toString()}`, { scroll: false })
  }

  const handleCondition = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      searchQuery.set('condition', value);
    } else {
      searchQuery.delete('condition');
    }
    router.push(`?${searchQuery.toString()}`, { scroll: false })
  }
  return <div className="w-64 hidden lg:block shrink-0 border-r pr-4">
    {/* Category */}
    <div className="mb-6">
      <h3 className="font-bold text-base mb-3">Category</h3>
      <div className="space-y-2">
        {CATEGORIES.map((category) => (
          <Checkbox key={category.value} label={category.name} value={category.value} checked={categories.includes(category.value)} onChange={handleCategory} />
        ))}
      </div>
    </div>
    <div className="border-t pt-4 mb-6">
      <h3 className="font-bold text-base mb-3">Brand</h3>
      <div className="space-y-2">
        {
          BRANDS.map((brand) => (
            <Checkbox key={brand.value} label={brand.name} value={brand.value} checked={brands.includes(brand.value)} onChange={handleBrand} />
          ))
        }

      </div>
    </div>
    {/* Customer Reviews */}
    <div className="border-t pt-4 mb-6">
      <h3 className="font-bold text-base mb-3">Customer Reviews</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
          <input
            type="checkbox"
            onChange={handleCustomerReview}
            checked={customerReview == '4'}
            value={'4'}
            className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
          />
          <div className="flex items-center gap-1">
            <div className="flex text-amazon-secondary text-sm">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4" />
            </div>
            <span className="text-sm">&amp; Up</span>
          </div>
        </label>
        <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            value={'3'}
            checked={customerReview == '3'}
            onChange={handleCustomerReview}
          />
          <div className="flex items-center gap-1">
            <div className="flex text-amazon-secondary text-sm">
              <Star data-lucide="star" className="w-4 h-4 fill-current" />
              <Star data-lucide="star" className="w-4 h-4 fill-current" />
              <Star data-lucide="star" className="w-4 h-4 fill-current" />
              <Star data-lucide="star" className="w-4 h-4" />
              <Star data-lucide="star" className="w-4 h-4" />
            </div>
            <span className="text-sm">&amp; Up</span>
          </div>
        </label>
      </div>
    </div>
    {/* Price Range */}
    <div className="border-t pt-4 mb-6">
      <h3 className="font-bold text-base mb-3">Price</h3>
      <div className="space-y-2">
        {PRICE_RANGE.map((price) => (
          <Checkbox key={price.value} label={price.name} value={price.value} checked={priceRange == price.value} onChange={handlePriceRange} />
        ))}

      </div>
    </div>
    {/* Availability */}
    <div className="border-t pt-4 mb-6">
      <h3 className="font-bold text-base mb-3">Availability</h3>
      <div className="space-y-2">
        {AVAILABILITY.map((availability) => (
          <Checkbox key={availability.value} label={availability.name} value={availability.value} checked={availabilityParams == availability.value} onChange={handleAvailability} />
        ))}
      </div>
    </div>
    {/* Condition */}
    <div className="border-t pt-4 mb-6">
      <h3 className="font-bold text-base mb-3">Condition</h3>
      <div className="space-y-2">
        {CONDITION.map((condition) => (
          <Checkbox key={condition.value}
            label={condition.name}
            value={condition.value}
            checked={conditionParams == condition.value}
            onChange={handleCondition} />
        ))}

      </div>
    </div>
  </div>
}