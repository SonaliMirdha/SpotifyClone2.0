"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import type { Playlist } from "@/lib/music-store"
import { useMusicContext } from "@/lib/music-store"

interface PlaylistCardProps {
  playlist: Playlist
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
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

  return (
    <Link href={`/playlist/${playlist.id}`}>
      <div className="group bg-gray-900/40 p-4 rounded-lg hover:bg-gray-800/60 transition-all duration-300 cursor-pointer">
        <div className="relative mb-4">
          <div className="aspect-square rounded-md overflow-hidden bg-gray-800">
            <Image
              src={playlist.cover || "/placeholder.svg"}
              alt={playlist.title}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            onClick={handlePlay}
            className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 text-black rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
          >
            <Play className="h-5 w-5 ml-0.5" />
          </Button>
        </div>
        <h3 className="font-semibold text-white mb-1 truncate">{playlist.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
      </div>
    </Link>
  )
}
