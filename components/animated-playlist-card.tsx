"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Heart, MoreHorizontal } from "lucide-react"
import type { Playlist } from "@/lib/music-store"
import { useMusicContext } from "@/lib/music-store"

interface AnimatedPlaylistCardProps {
  playlist: Playlist
  index: number
}

export function AnimatedPlaylistCard({ playlist, index }: AnimatedPlaylistCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { setQueue, setCurrentTrack, togglePlay, isPlaying } = useMusicContext()

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (playlist.tracks.length > 0) {
      setQueue(playlist.tracks, 0)
      setCurrentTrack(playlist.tracks[0])
      if (!isPlaying) {
        togglePlay()
      }
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  return (
    <Link href={`/playlist/${playlist.id}`}>
      <div
        className="group relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 p-4 rounded-xl hover:from-gray-800/80 hover:to-gray-700/60 transition-all duration-500 cursor-pointer backdrop-blur-sm border border-white/5 hover:border-white/10 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

        <div className="relative">
          <div className="relative mb-4 overflow-hidden rounded-lg">
            <div className="aspect-square bg-gray-800 relative">
              <Image
                src={playlist.cover || "/placeholder.svg"}
                alt={playlist.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Floating play button */}
              <Button
                onClick={handlePlay}
                className={`absolute bottom-3 right-3 bg-green-500 hover:bg-green-400 text-black rounded-full w-12 h-12 shadow-lg transform transition-all duration-300 ${
                  isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-75"
                }`}
              >
                <Play className="h-5 w-5 ml-0.5" />
              </Button>

              {/* Like button */}
              <Button
                onClick={handleLike}
                variant="ghost"
                className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
              </Button>

              {/* Track count badge */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white font-medium">
                {playlist.tracks.length} tracks
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-white text-lg truncate group-hover:text-green-400 transition-colors duration-300">
              {playlist.title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
              {playlist.description}
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500 font-medium">by {playlist.creator}</span>
              <Button
                variant="ghost"
                size="sm"
                className={`w-6 h-6 p-0 text-gray-400 hover:text-white transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Animated border */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-sm" />
        </div>
      </div>
    </Link>
  )
}
