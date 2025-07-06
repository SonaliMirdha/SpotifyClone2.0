"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import type { Track } from "@/lib/music-store"
import { useMusicContext } from "@/lib/music-store"
import { cn } from "@/lib/utils"
import { ImageWithFallback } from "./image-with-fallback"

interface TrackCardProps {
  track: Track
  index?: number
  showIndex?: boolean
  className?: string
}

export function TrackCard({ track, index, showIndex = false, className }: TrackCardProps) {
  const { currentTrack, isPlaying, setCurrentTrack, togglePlay, setQueue } = useMusicContext()
  const isCurrentTrack = currentTrack?.id === track.id

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlay()
    } else {
      setCurrentTrack(track)
      setQueue([track], 0)
      if (!isPlaying) {
        togglePlay()
      }
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div
      className={cn(
        "group flex items-center space-x-4 p-2 rounded-md hover:bg-gray-800/50 transition-colors",
        isCurrentTrack && "bg-gray-800/30",
        className,
      )}
    >
      {showIndex && (
        <div className="w-4 text-center">
          <span className={cn("text-sm text-gray-400 group-hover:hidden", isCurrentTrack && "text-green-500")}>
            {index! + 1}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePlay}
            className="hidden group-hover:flex w-4 h-4 p-0 items-center justify-center"
          >
            {isCurrentTrack && isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </Button>
        </div>
      )}

      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-800 flex-shrink-0">
        <ImageWithFallback
          src={track.cover || "/placeholder.svg"}
          alt={track.title}
          fill
          className="object-cover"
          fallbackText={track.title}
        />
        {!showIndex && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Button variant="ghost" size="sm" onClick={handlePlay} className="w-6 h-6 p-0">
              {isCurrentTrack && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium truncate", isCurrentTrack ? "text-green-500" : "text-white")}>
          {track.title}
        </p>
        <p className="text-xs text-gray-400 truncate">{track.artist}</p>
      </div>

      <div className="text-xs text-gray-400">{formatDuration(track.duration)}</div>
    </div>
  )
}
