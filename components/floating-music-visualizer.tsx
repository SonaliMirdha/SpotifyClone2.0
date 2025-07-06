"use client"

import { useEffect, useState } from "react"
import { useMusicContext } from "@/lib/music-store"

export function FloatingMusicVisualizer() {
  const { isPlaying, currentTrack } = useMusicContext()
  const [bars, setBars] = useState<number[]>(Array(12).fill(0))

  useEffect(() => {
    if (!isPlaying || !currentTrack) {
      setBars(Array(12).fill(0))
      return
    }

    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.random() * 100))
    }, 150)

    return () => clearInterval(interval)
  }, [isPlaying, currentTrack])

  if (!currentTrack) return null

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-md rounded-lg p-3 border border-white/10">
      <div className="flex items-center space-x-2">
        <div className="flex items-end space-x-1 h-8">
          {bars.map((height, index) => (
            <div
              key={index}
              className="w-1 bg-gradient-to-t from-green-500 to-green-300 rounded-full transition-all duration-150 ease-out"
              style={{
                height: `${Math.max(4, height * 0.3)}px`,
                opacity: isPlaying ? 1 : 0.3,
              }}
            />
          ))}
        </div>
        <div className="text-xs text-white/80 ml-2">{isPlaying ? "Now Playing" : "Paused"}</div>
      </div>
    </div>
  )
}
