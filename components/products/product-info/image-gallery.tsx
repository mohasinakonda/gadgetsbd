'use client'

import Image from "next/image"
import { useState } from "react"

type Props = {
  images: string[]
  defaultImage: string
}

export const ImageGallery = ({ images, defaultImage }: Props) => {
  const [currentImage, setCurrentImage] = useState(defaultImage)
  return <div className="lg:col-span-5 flex gap-4">
    <div className="flex flex-col gap-2">
      {images.map(image => <button
        key={image}
        onClick={() => setCurrentImage(image)}
        className="w-10 h-10 border border-amazon-secondary rounded overflow-hidden hover:shadow-md">
        <Image
          width={40}
          height={40}
          alt=""
          src={image}
          className="w-full h-full object-cover"
        />
      </button>)}

    </div>
    <div className="flex-1 border border-gray-200 rounded p-4 bg-gray-50">
      <Image
        width={600}
        height={600}
        alt=""
        src={currentImage}
        className="w-full h-auto object-cover"
      />
    </div>
  </div>
}