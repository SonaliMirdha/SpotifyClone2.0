"use client"

import { useState } from "react"
import Image from "next/image"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  fallbackText?: string
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = "",
  fill = false,
  fallbackText,
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div
        className={`bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center ${className}`}
        style={!fill ? { width, height } : undefined}
      >
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xl">🎵</span>
          </div>
          <p className="text-white/80 text-xs font-medium truncate">{fallbackText || alt}</p>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      onError={() => setImageError(true)}
    />
  )
}
