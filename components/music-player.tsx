"use client"

import { useEffect, useRef, useState } from "react"
import { useMusicContext } from "@/lib/music-store"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    isRepeated,
    togglePlay,
    setCurrentTime,
    setDuration,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    nextTrack,
    previousTrack,
  } = useMusicContext()

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isVinylSpinning, setIsVinylSpinning] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    audio.src = currentTrack.preview_url
    audio.volume = isMuted ? 0 : volume

    if (isPlaying) {
      setIsVinylSpinning(true)
      audio.play().catch(console.error)
    } else {
      setIsVinylSpinning(false)
      audio.pause()
    }
  }, [currentTrack, isPlaying, volume, isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime)
      }
    }

    const updateDuration = () => {
      setDuration(audio.duration || 0)
    }

    const handleEnded = () => {
      if (isRepeated) {
        audio.currentTime = 0
        audio.play()
      } else {
        nextTrack()
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [isDragging, isRepeated, nextTrack, setCurrentTime, setDuration])

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = value[0]
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (!currentTrack) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
      <audio ref={audioRef} />

      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-4 min-w-0 w-1/4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-800 flex-shrink-0 group">
            <Image
              src={currentTrack.cover || "/placeholder.svg"}
              alt={currentTrack.title}
              fill
              className={`object-cover transition-transform duration-300 ${
                isVinylSpinning ? "animate-vinyl-spin" : ""
              }`}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full opacity-60"></div>
            </div>
            {isPlaying && (
              <div className="absolute -inset-1 rounded-full border-2 border-green-500/50 animate-pulse"></div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate hover:text-green-400 transition-colors cursor-pointer">
              {currentTrack.title}
            </p>
            <p className="text-xs text-gray-400 truncate hover:text-gray-300 transition-colors cursor-pointer">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 w-1/2 max-w-md">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleShuffle}
              className={cn("text-gray-400 hover:text-white", isShuffled && "text-green-500")}
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" onClick={previousTrack} className="text-gray-400 hover:text-white">
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="bg-white text-black hover:bg-gray-200 rounded-full w-8 h-8"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={nextTrack} className="text-gray-400 hover:text-white">
              <SkipForward className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRepeat}
              className={cn("text-gray-400 hover:text-white", isRepeated && "text-green-500")}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              onPointerDown={() => setIsDragging(true)}
              onPointerUp={() => setIsDragging(false)}
              className="flex-1 [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-600 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
            />
            <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <Button variant="ghost" size="sm" onClick={toggleMute} className="text-gray-400 hover:text-white">
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0] / 100)}
            className="w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-600 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
          />
        </div>
      </div>
    </div>
  )
}
