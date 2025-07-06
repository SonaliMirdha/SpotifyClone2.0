"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, Heart, Share } from "lucide-react"
import { useMusicContext } from "@/lib/music-store"
import { mockTracks } from "@/lib/api"

const featuredArtists = [
  {
    name: "The Weeknd",
    image: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb",
    gradient: "from-red-500 via-purple-600 to-blue-700",
    track: mockTracks[0],
    description: "Blinding Lights - The biggest hit of the decade",
  },
  {
    name: "Taylor Swift",
    image: "https://i.scdn.co/image/ab6761610000e5eb859e4c14fa59296c8649e0e4",
    gradient: "from-purple-500 via-pink-600 to-red-700",
    track: mockTracks[5],
    description: "Anti-Hero - From the album Midnights",
  },
  {
    name: "Harry Styles",
    image: "https://i.scdn.co/image/ab6761610000e5eb8ac5768205ad474c4f6f8f8f",
    gradient: "from-green-500 via-blue-600 to-purple-700",
    track: mockTracks[6],
    description: "As It Was - Harry's House era",
  },
]

export function EpicHeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>(
    [],
  )
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setCurrentTrack, togglePlay, isPlaying, currentTrack } = useMusicContext()

  const currentArtist = featuredArtists[currentIndex]
  const isCurrentTrackPlaying = currentTrack?.id === currentArtist.track.id && isPlaying

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * 400,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
    }))
    setParticles(newParticles)
  }, [])

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(Date.now() * 0.001 + particle.id) * 0.1})`
        ctx.fill()

        particle.x += Math.sin(Date.now() * 0.001 + particle.id) * particle.speed
        particle.y += Math.cos(Date.now() * 0.001 + particle.id) * particle.speed * 0.5

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height
      })

      requestAnimationFrame(animateParticles)
    }

    animateParticles()
  }, [particles])

  // Auto-rotate banners
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredArtists.length)
    }, 6000)

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
    <div className="relative h-[500px] overflow-hidden rounded-3xl mb-8 group">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: "transparent" }} />

      {/* Dynamic Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentArtist.gradient} transition-all duration-2000 ease-in-out opacity-90`}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Morphing Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            left: "10%",
            top: "20%",
            animation: "morph 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
            right: "15%",
            bottom: "25%",
            animation: "morph 6s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center h-full p-8">
        <div className="flex-1 max-w-2xl">
          {/* Floating Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/20 animate-float">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Now Trending
            </span>
          </div>

          {/* Artist Name with Glitch Effect */}
          <h1 className="text-7xl font-black text-white mb-4 relative">
            <span className="relative z-10">{currentArtist.name}</span>
            <span
              className="absolute inset-0 text-red-500 opacity-30 animate-glitch"
              style={{ animationDelay: "0.1s" }}
            >
              {currentArtist.name}
            </span>
            <span
              className="absolute inset-0 text-blue-500 opacity-30 animate-glitch"
              style={{ animationDelay: "0.2s" }}
            >
              {currentArtist.name}
            </span>
          </h1>

          {/* Track Description */}
          <p className="text-xl text-white/90 mb-8 animate-slide-up-delayed">{currentArtist.description}</p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={handlePlay}
              className="bg-green-500 hover:bg-green-400 text-black rounded-full px-8 py-4 font-bold text-lg transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 animate-pulse-glow"
            >
              {isCurrentTrackPlaying ? (
                <>
                  <Pause className="h-6 w-6 mr-3" />
                  Pause Track
                </>
              ) : (
                <>
                  <Play className="h-6 w-6 mr-3" />
                  Play Now
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md rounded-full px-6 py-4 transform hover:scale-105 transition-all duration-300 bg-transparent border-2 hover:border-white/60"
            >
              <Heart className="h-5 w-5 mr-2" />
              Like
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md rounded-full px-6 py-4 transform hover:scale-105 transition-all duration-300 bg-transparent border-2 hover:border-white/60"
            >
              <Share className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>

          {/* Audio Visualizer Bars */}
          <div className="flex items-center space-x-1 mt-8">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-white/60 rounded-full animate-music-bar"
                style={{
                  height: `${Math.random() * 30 + 10}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Artist Image with 3D Effect */}
        <div className="relative">
          <div className="relative w-80 h-80 transform-gpu perspective-1000">
            {/* Holographic Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-spin-slow">
              <div className="absolute inset-4 rounded-full border-2 border-white/10 animate-spin-reverse">
                <div className="absolute inset-4 rounded-full border border-white/5 animate-spin-slow"></div>
              </div>
            </div>

            {/* Main Image */}
            <div className="absolute inset-8 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 animate-float-slow">
              <Image
                src={currentArtist.image || "/placeholder.svg"}
                alt={currentArtist.name}
                fill
                className="object-cover"
              />

              {/* Holographic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-bounce-slow">
              <Volume2 className="h-6 w-6 text-white" />
            </div>

            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-green-500/80 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-lg font-bold">♪</span>
            </div>

            <div className="absolute top-1/2 -left-8 w-8 h-8 bg-purple-500/60 backdrop-blur-md rounded-full flex items-center justify-center animate-bounce">
              <span className="text-white text-sm">♫</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {featuredArtists.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`relative w-4 h-4 rounded-full transition-all duration-500 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
            }`}
          >
            {index === currentIndex && <div className="absolute inset-0 rounded-full bg-white animate-ping"></div>}
          </button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-100 ease-linear"
          style={{
            width: isAutoPlaying ? "100%" : "0%",
            animation: isAutoPlaying ? "progress 6s linear infinite" : "none",
          }}
        />
      </div>
    </div>
  )
}
