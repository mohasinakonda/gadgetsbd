'use client'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
export const SubmitButton = () => {
  const { pending } = useFormStatus()

  return <button disabled={pending} type="submit" className="w-full bg-amazon-yellow hover:bg-amazon-yellow_hover py-2 rounded-md shadow-sm mb-2 text-sm font-medium border border-amazon-secondary flex items-center justify-center gap-2">
    {pending && <Loader2 className="w-4 h-4 animate-spin" />} Add to Cart
  </button>
}