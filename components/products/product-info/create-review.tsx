"use client"

import { ChangeEvent, useState } from "react"
import { Modal } from "@/components/common/modal"
import { uploadFile } from "@/services/upload-file"
import { Product } from "@/types/product"
import { Camera, Star } from "lucide-react"
import Image from "next/image"

type Props = {
  product: Product
  onReviewCreated?: () => void
}

type PopoverElement = HTMLElement & {
  hidePopover?: () => void
}

export const CreateReview = ({ product, onReviewCreated }: Props) => {

  const [formdata, setFormdata] = useState({
    rating: 0,
    title: "",
    comment: "",
    userName: "",
    image: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const resetForm = () => {
    setFormdata({
      rating: 0,
      title: "",
      comment: "",
      userName: "",
      image: ''
    })
  }

  const hideModal = () => {
    const modal = document.getElementById("modal") as PopoverElement | null
    modal?.hidePopover?.()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setSuccess(false)

    if (!formdata.rating) {
      setError("Please select an overall rating.")
      return
    }

    try {
      setIsSubmitting(true)


      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          rating: formdata.rating,
          title: formdata.title.trim(),
          comment: formdata.comment.trim(),
          image: formdata.image,
          userName: formdata.userName.trim() || undefined
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data?.error || "Failed to submit review")
      }

      resetForm()
      setSuccess(true)
      onReviewCreated?.()
      hideModal()
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Failed to submit review"
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleChange = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    if (name === 'image') {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) {
        const url = await uploadFile(file)
        setFormdata({
          ...formdata,
          image: url
        })
      }
    } else {
      setFormdata({
        ...formdata,
        [name]: value
      })
    }
  }
  return (
    <Modal>
      <main className="w-full">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-normal">Create Review</h1>
          <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
            <Image
              src={product.defaultImage}
              width={64}
              height={64}
              className="w-16 h-16 object-cover border border-gray-200 rounded"
              alt={product.productName}
            />
            <h2 className="font-bold text-sm">{product.productName}</h2>
          </div>
          <form className="space-y-10" onSubmit={handleSubmit}>
            <section className="space-y-4">
              <h3 className="text-xl font-bold">Overall rating</h3>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, index) => {
                  const starValue = index + 1
                  const isActive = starValue <= formdata.rating
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setFormdata({
                        ...formdata,
                        rating: starValue
                      })}
                      className="group transition-transform hover:scale-110"
                      aria-label={`Rate ${starValue} star`}
                    >
                      <Star
                        className={`w-8 h-8 ${isActive
                          ? "text-amazon-yellow fill-current"
                          : "text-gray-300 fill-current group-hover:text-amazon-yellow"
                          }`}
                      />
                    </button>
                  )
                })}
              </div>
            </section>
            <hr className="border-gray-200" />
            <section className="space-y-4">
              <h3 className="text-xl font-bold">Your name (optional)</h3>
              <input
                name="userName"
                type="text"
                value={formdata.userName}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border border-gray-300 rounded p-2 outline-none focus:ring-1 focus:ring-amazon-blue"
              />
            </section>
            <hr className="border-gray-200" />
            <section className="space-y-4">
              <h3 className="text-xl font-bold">Add a photo or video</h3>
              <p className="text-sm">
                Shoppers find images and videos more helpful than text alone.
              </p>
              <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-amazon-blue transition-colors gap-2">
                <Camera className="w-8 h-8 text-gray-400" />

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </section>
            <hr className="border-gray-200" />
            <section className="space-y-4">
              <h3 className="text-xl font-bold">Add a headline</h3>
              <input
                type="text"
                name="title"
                value={formdata.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 outline-none focus:ring-1 focus:ring-amazon-blue"
              />
            </section>
            <hr className="border-gray-200" />
            <section className="space-y-4">
              <h3 className="text-xl font-bold">Add a written review</h3>
              <textarea
                rows={6}
                name="comment"
                value={formdata.comment}
                onChange={handleChange}
                placeholder="What did you like or dislike? What did you use this product for?"
                className="w-full border border-gray-300 rounded p-4 outline-none focus:ring-1 focus:ring-amazon-blue"
              />
            </section>
            {(error || success) && (
              <p
                className={`text-sm ${error ? "text-red-600" : "text-green-600"
                  }`}
              >
                {error || "Review submitted successfully."}
              </p>
            )}
            <div className="border-t border-gray-200 pt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-8 py-2 rounded-md shadow-sm border border-amazon-secondary font-bold disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </Modal>
  )
}