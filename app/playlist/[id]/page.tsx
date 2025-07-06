"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TrackCard } from "@/components/track-card"
import { getPlaylist } from "@/lib/api"
import type { Playlist } from "@/lib/music-store"
import { useMusicContext } from "@/lib/music-store"
import { Play, Pause, Heart, MoreHorizontal, Clock } from "lucide-react"

export default function PlaylistPage() {
  const params = useParams()
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [loading, setLoading] = useState(true)
  const { setQueue, setCurrentTrack, togglePlay, isPlaying, currentTrack } = useMusicContext()

  const playlistId = params.id as string
  const isPlaylistPlaying = playlist?.tracks.some((track) => track.id === currentTrack?.id) && isPlaying

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const data = await getPlaylist(playlistId)
        setPlaylist(data)
      } catch (error) {
        console.error("Failed to load playlist:", error)
      } finally {
        setLoading(false)
      }
    }

    if (playlistId) {
      loadPlaylist()
    }
  }, [playlistId])

  const handlePlayPlaylist = () => {
    if (!playlist || playlist.tracks.length === 0) return

    if (isPlaylistPlaying) {
      togglePlay()
    } else {
      setQueue(playlist.tracks, 0)
      setCurrentTrack(playlist.tracks[0])
      if (!isPlaying) {
        togglePlay()
      }
    }
  }

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)

    if (hours > 0) {
      return `${hours} hr ${minutes} min`
    }
    return `${minutes} min`
  }

  const totalDuration = playlist?.tracks.reduce((acc, track) => acc + track.duration, 0) || 0

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-60 h-60 bg-gray-800 rounded-lg"></div>
            <div className="flex-1 space-y-4">
              <div className="h-4 bg-gray-800 rounded w-20"></div>
              <div className="h-12 bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              <div className="h-4 bg-gray-800 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!playlist) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Playlist not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-900/80 to-black/20 p-6">
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="w-60 h-60 rounded-lg overflow-hidden bg-gray-800 shadow-2xl">
            <Image
              src={playlist.cover || "/placeholder.svg"}
              alt={playlist.title}
              width={240}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-sm font-medium text-white uppercase tracking-wider">Playlist</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white">{playlist.title}</h1>
            <p className="text-gray-300 text-lg">{playlist.description}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="font-medium">{playlist.creator}</span>
              <span>•</span>
              <span>{playlist.tracks.length} songs</span>
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
            onClick={handlePlayPlaylist}
            className="bg-green-500 hover:bg-green-400 text-black rounded-full w-14 h-14"
          >
            {isPlaylistPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Heart className="h-6 w-6" />
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-6 pb-6">
        <div className="bg-black/20 rounded-lg">
          {/* Header */}
          <div className="grid grid-cols-[16px_1fr_1fr_1fr_60px] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
            <div className="text-center">#</div>
            <div>Title</div>
            <div>Album</div>
            <div>Date added</div>
            <div className="text-center">
              <Clock className="h-4 w-4 mx-auto" />
            </div>
          </div>

          {/* Tracks */}
          <div className="p-2">
            {playlist.tracks.map((track, index) => (
              <TrackCard
                key={track.id}
                track={track}
                index={index}
                showIndex={true}
                className="grid grid-cols-[16px_1fr_1fr_1fr_60px] gap-4 px-2 py-2 hover:bg-white/5"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
