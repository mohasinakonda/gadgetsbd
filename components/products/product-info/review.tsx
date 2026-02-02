"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Product, Review as ReviewType } from "@/types/product"
import { Star } from "lucide-react"
import { CreateReview } from "./create-review"

type Props = {
  product: Product
}
export const Review = ({ product }: Props) => {
  const [reviews, setReviews] = useState<ReviewType[]>([])
  const [summary, setSummary] = useState({
    averageRating: product.averageRating ?? 0,
    reviewCount: product.reviewCount ?? 0
  })
  const [visibleCount, setVisibleCount] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchReviews = useCallback(async () => {
    if (!product?._id) return
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch(`/api/reviews?productId=${product._id}`)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error || "Failed to load reviews")
      }
      setReviews(data?.data ?? [])
      setSummary({
        averageRating: data?.summary?.averageRating ?? 0,
        reviewCount: data?.summary?.reviewCount ?? 0
      })
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : "Failed to load reviews"
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [product?._id])

  useEffect(() => {
    fetchReviews()
    setVisibleCount(2)
  }, [fetchReviews])

  const visibleReviews = useMemo(
    () => reviews.slice(0, visibleCount),
    [reviews, visibleCount]
  )

  const renderStars = (rating: number, size: string) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={`${rating}-${index}`}
        className={`${size} ${index < rating
          ? "text-amazon-secondary fill-current"
          : "text-gray-300"
          }`}
      />
    ))

  const getInitials = (name?: string) => {
    const fallback = "AN"
    if (!name) return fallback
    const parts = name.trim().split(/\s+/).slice(0, 2)
    if (!parts.length) return fallback
    return parts.map((part) => part[0]?.toUpperCase()).join("")
  }

  const imageLoader = ({ src }: { src: string }) => src

  const formatDate = (value?: Date | string) => {
    if (!value) return ""
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ""
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <div id="reviews-tab" className="tab-content">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        <button
          popoverTarget="modal"
          popoverTargetAction="show"
          className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-2 rounded-md text-sm font-medium border border-amazon-secondary"
        >
          Write a Review
        </button>
        <CreateReview product={product} onReviewCreated={fetchReviews} />
      </div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex text-amazon-secondary">
            {renderStars(Math.round(summary.averageRating), "w-5 h-5")}
          </div>
          <span className="text-lg font-bold">
            {summary.averageRating.toFixed(1)} out of 5
          </span>
        </div>
        <span className="text-sm text-gray-600">
          {summary.reviewCount} global ratings
        </span>
      </div>
      {/* Review List */}
      <div className="space-y-6" id="reviewList">
        {isLoading && (
          <p className="text-sm text-gray-500">Loading reviews...</p>
        )}
        {error && !isLoading && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {!isLoading && !error && visibleReviews.length === 0 && (
          <p className="text-sm text-gray-500">
            No reviews yet. Be the first to review this product.
          </p>
        )}
        {visibleReviews.map((review) => {
          const name = review.userName || "Anonymous"
          return (
            <div key={review._id} className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                  {getInitials(name)}
                </div>
                <div>
                  <p className="font-bold text-sm">{name}</p>
                  <div className="flex text-amazon-secondary">
                    {renderStars(review.rating, "w-3 h-3")}
                  </div>
                </div>
              </div>
              {review.title && (
                <h4 className="font-bold text-sm mb-1">{review.title}</h4>
              )}
              {review.createdAt && (
                <p className="text-xs text-gray-500 mb-2">
                  Reviewed in Bangladesh on {formatDate(review.createdAt)}
                </p>
              )}
              {review.comment && (
                <p className="text-sm mb-3">{review.comment}</p>
              )}
              {review.image && (
                <Image
                  loader={imageLoader}
                  unoptimized
                  src={review.image}
                  width={128}
                  height={128}
                  alt={review.title || "Review image"}
                  className="w-32 h-32 object-cover rounded border border-gray-200"
                />
              )}
            </div>
          )
        })}
      </div>
      {reviews.length > visibleCount && (
        <button
          id="loadMoreBtn"
          onClick={() => setVisibleCount((count) => count + 2)}
          className="mt-6 px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
        >
          Load More Reviews
        </button>
      )}
    </div>
  )
}