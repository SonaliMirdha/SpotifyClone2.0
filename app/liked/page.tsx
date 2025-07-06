"use client"

import { TrackCard } from "@/components/track-card"
import { mockTracks } from "@/lib/api"
import { useMusicContext } from "@/lib/music-store"
import { Button } from "@/components/ui/button"
import { Play, Pause, Heart, Download, MoreHorizontal } from "lucide-react"

export default function LikedSongsPage() {
  const { setQueue, setCurrentTrack, togglePlay, isPlaying, currentTrack } = useMusicContext()

  const isLikedSongsPlaying = mockTracks.some((track) => track.id === currentTrack?.id) && isPlaying

  const handlePlayLikedSongs = () => {
    if (mockTracks.length === 0) return

    if (isLikedSongsPlaying) {
      togglePlay()
    } else {
      setQueue(mockTracks, 0)
      setCurrentTrack(mockTracks[0])
      if (!isPlaying) {
        togglePlay()
      }
    }
  }

  const totalDuration = mockTracks.reduce((acc, track) => acc + track.duration, 0)
  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)

    if (hours > 0) {
      return `${hours} hr ${minutes} min`
    }
    return `${minutes} min`
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-900/80 to-black/20 p-6">
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="w-60 h-60 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl flex items-center justify-center">
            <Heart className="h-20 w-20 text-white" />
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-sm font-medium text-white uppercase tracking-wider">Playlist</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white">Liked Songs</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="font-medium">Your Library</span>
              <span>•</span>
              <span>{mockTracks.length} songs</span>
              <span>•</span>
              <span>{formatDuration(totalDuration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-b from-black/20 to-black px-6 py-6">
        <div className="flex items-center space-x-6">
          <Button
            onClick={handlePlayLikedSongs}
            className="bg-green-500 hover:bg-green-400 text-black rounded-full w-14 h-14"
          >
            {isLikedSongsPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Download className="h-6 w-6" />
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-6 pb-6">
        <div className="bg-black/20 rounded-lg p-2">
          {mockTracks.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} showIndex={true} />
          ))}
        </div>
      </div>
    </div>
  )
}
