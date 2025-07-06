"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { useMusicContext } from "@/lib/music-store"
import { mockTracks } from "@/lib/api"

const featuredArtists = [
  {
    name: "The Weeknd",
    image: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb",
    gradient: "from-red-500 via-purple-600 to-blue-700",
    track: mockTracks[0],
  },
  {
    name: "Taylor Swift",
    image: "https://i.scdn.co/image/ab6761610000e5eb859e4c14fa59296c8649e0e4",
    gradient: "from-purple-500 via-pink-600 to-red-700",
    track: mockTracks[5],
  },
  {
    name: "Harry Styles",
    image: "https://i.scdn.co/image/ab6761610000e5eb2e8ed79e177ff6011076f5f0",
    gradient: "from-green-500 via-blue-600 to-purple-700",
    track: mockTracks[6],
  },
]

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { setCurrentTrack, togglePlay, isPlaying, currentTrack } = useMusicContext()

  const currentArtist = featuredArtists[currentIndex]
  const isCurrentTrackPlaying = currentTrack?.id === currentArtist.track.id && isPlaying

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredArtists.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePlay = () => {
    if (isCurrentTrackPlaying) {
      togglePlay()
    } else {
      setCurrentTrack(currentArtist.track)
      if (!isPlaying) {
        togglePlay()
      }
    }
  }

  return (
    <div className="relative h-96 overflow-hidden rounded-2xl mb-8">
      {/* Background with animated gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentArtist.gradient} transition-all duration-1000 ease-in-out`}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse" />
        <div
          className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.1),transparent)] animate-spin"
          style={{ animationDuration: "20s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full p-8">
        <div className="flex-1">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-4 animate-fade-in">
              Featured Artist
            </span>
          </div>

          <h1 className="text-6xl font-bold text-white mb-4 animate-slide-up">{currentArtist.name}</h1>

          <p className="text-xl text-white/90 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Now playing: {currentArtist.track.title}
          </p>

          <div className="flex items-center space-x-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button
              onClick={handlePlay}
              className="bg-green-500 hover:bg-green-400 text-black rounded-full px-8 py-3 font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
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
              Follow
            </Button>
          </div>
        </div>

        {/* Artist Image */}
        <div className="relative">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <Image
              src={currentArtist.image || "/placeholder.svg"}
              alt={currentArtist.name}
              width={256}
              height={256}
              className="w-full h-full object-cover animate-fade-in"
            />
          </div>

          {/* Floating music notes */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
            <span className="text-white text-lg">♪</span>
          </div>
          <div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="text-white text-sm">♫</span>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredArtists.map((_, index) => (
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
