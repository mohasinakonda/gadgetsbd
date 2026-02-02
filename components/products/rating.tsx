import { Star } from "lucide-react"

export const Rating = ({ avgRating }: { avgRating: number }) => {

  return <div className="flex text-amazon-secondary">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star data-lucide="star" className={`w-4 h-4 ${index < avgRating ? 'fill-current' : ''}`} key={index} />
    ))}
  </div>
}