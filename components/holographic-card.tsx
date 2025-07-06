"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Heart, MoreHorizontal } from "lucide-react"
import type { Playlist } from "@/lib/music-store"
import { useMusicContext } from "@/lib/music-store"

interface HolographicCardProps {
  playlist: Playlist
  index: number
}

export function HolographicCard({ playlist, index }: HolographicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { setQueue, setCurrentTrack, togglePlay, isPlaying } = useMusicContext()

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
    }

    card.addEventListener("mousemove", handleMouseMove)
    return () => card.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (playlist.tracks.length > 0) {
      setQueue(playlist.tracks, 0)
      setCurrentTrack(playlist.tracks[0])
      if (!isPlaying) togglePlay()
    }
  }

  return (
    <Link href={`/playlist/${playlist.id}`}>
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl cursor-pointer transform-gpu"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${(mousePosition.y - 150) * 0.1}deg) rotateY(${(mousePosition.x - 150) * 0.1}deg) translateZ(20px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: "transform 0.3s ease-out",
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Holographic Background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />

        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full">
          {/* Prismatic Edge Effect */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(45deg, 
                rgba(255,0,150,0.1) 0%, 
                rgba(0,255,255,0.1) 25%, 
                rgba(255,255,0,0.1) 50%, 
                rgba(150,0,255,0.1) 75%, 
                rgba(255,0,150,0.1) 100%)`,
              backgroundSize: "400% 400%",
              animation: "rainbow-shift 3s ease infinite",
            }}
          />

          {/* Image Container */}
          <div className="relative mb-6 overflow-hidden rounded-xl">
            <div className="aspect-square bg-gray-800 relative group-hover:scale-105 transition-transform duration-700">
              <Image src={playlist.cover || "/placeholder.svg"} alt={playlist.title} fill className="object-cover" />

              {/* Holographic Shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)`,
                  transform: `translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.1}px)`,
                }}
              />

              {/* Floating Play Button */}
              <Button
                onClick={handlePlay}
                className={`absolute bottom-4 right-4 bg-green-500/90 hover:bg-green-400 text-black rounded-full w-14 h-14 shadow-2xl backdrop-blur-sm transform transition-all duration-500 ${
                  isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-75"
                }`}
                style={{
                  boxShadow: isHovered ? "0 0 30px rgba(34, 197, 94, 0.6)" : "none",
                }}
              >
                <Play className="h-6 w-6 ml-0.5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-lg truncate group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
              {playlist.title}
            </h3>

            <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
              {playlist.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500 font-medium">
                {playlist.tracks.length} tracks • {playlist.creator}
              </span>

              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-8 h-8 p-0 text-gray-400 hover:text-red-400 transition-all duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Heart className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-8 h-8 p-0 text-gray-400 hover:text-white transition-all duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quantum Dots */}
          <div className="absolute top-4 right-4 flex space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-white/20 animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
