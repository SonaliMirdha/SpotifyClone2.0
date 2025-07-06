"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Pause, Heart, Share } from "lucide-react"
import { useMusicContext } from "@/lib/music-store"
import { mockTracks } from "@/lib/api"

const featuredContent = [
  {
    type: "artist",
    name: "Arijit Singh",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    gradient: "from-orange-500 via-red-600 to-pink-700",
    track: mockTracks[3], // Kesariya
    description: "The voice of Bollywood - Kesariya from Brahmastra",
    badge: "Bollywood King",
  },
  {
    type: "artist",
    name: "AP Dhillon",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    gradient: "from-green-500 via-yellow-600 to-orange-700",
    track: mockTracks[8], // Brown Munde
    description: "Punjabi sensation taking the world by storm",
    badge: "Punjabi Superstar",
  },
  {
    type: "artist",
    name: "The Weeknd",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&sat=-50",
    gradient: "from-purple-500 via-blue-600 to-indigo-700",
    track: mockTracks[0], // Blinding Lights
    description: "Global phenomenon - Blinding Lights",
    badge: "International Hit",
  },
  {
    type: "artist",
    name: "Diljit Dosanjh",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&hue=60",
    gradient: "from-yellow-500 via-green-600 to-blue-700",
    track: mockTracks[10], // Goat
    description: "Punjabi icon crossing all boundaries",
    badge: "Global Punjabi Star",
  },
]

export function EnhancedHeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({})
  const { setCurrentTrack, togglePlay, isPlaying, currentTrack } = useMusicContext()

  const currentContent = featuredContent[currentIndex]
  const isCurrentTrackPlaying = currentTrack?.id === currentContent.track.id && isPlaying

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePlay = () => {
    if (isCurrentTrackPlaying) {
      togglePlay()
    } else {
      setCurrentTrack(currentContent.track)
      if (!isPlaying) {
        togglePlay()
      }
    }
  }

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <div className="relative h-96 overflow-hidden rounded-2xl mb-8 group">
      {/* Background with smooth gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentContent.gradient} transition-all duration-1000 ease-in-out`}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_0%,transparent_50%)]"
          style={{
            animation: "float 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full p-8">
        <div className="flex-1 max-w-2xl">
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              {currentContent.badge}
            </span>
          </div>

          {/* Artist Name */}
          <h1 className="text-6xl font-bold text-white mb-4">{currentContent.name}</h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-6">{currentContent.description}</p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={handlePlay}
              className="bg-green-500 hover:bg-green-400 text-black rounded-full px-8 py-3 font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {isCurrentTrackPlaying ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Play Now
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 transform hover:scale-105 transition-all duration-200 bg-transparent"
            >
              <Heart className="h-4 w-4 mr-2" />
              Like
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 transform hover:scale-105 transition-all duration-200 bg-transparent"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Artist Image */}
        <div className="relative">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300 bg-gray-800">
            {imageError[currentIndex] ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <p className="text-white/80 text-sm font-medium">{currentContent.name}</p>
                </div>
              </div>
            ) : (
              <Image
                src={currentContent.image || "/placeholder.svg"}
                alt={currentContent.name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
                onError={() => handleImageError(currentIndex)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: isAutoPlaying ? "100%" : "0%",
            animation: isAutoPlaying ? "progress 5s linear infinite" : "none",
          }}
        />
      </div>
    </div>
  )
}
