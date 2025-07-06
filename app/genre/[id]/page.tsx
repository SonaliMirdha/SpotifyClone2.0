"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { TrackCard } from "@/components/track-card"
import { PlaylistCard } from "@/components/playlist-card"
import { getTracksByGenre, genres, mockPlaylists } from "@/lib/api"
import type { Track } from "@/lib/music-store"
import { useMusicContext } from "@/lib/music-store"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function GenrePage() {
  const params = useParams()
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const { setQueue, setCurrentTrack, togglePlay, isPlaying } = useMusicContext()

  const genreId = params.id as string
  const genre = genres.find((g) => g.id === genreId)

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const genreTracks = await getTracksByGenre(genreId)
        setTracks(genreTracks)
      } catch (error) {
        console.error("Failed to load genre tracks:", error)
      } finally {
        setLoading(false)
      }
    }

    if (genreId) {
      loadTracks()
    }
  }, [genreId])

  const handlePlayGenre = () => {
    if (tracks.length === 0) return

    setQueue(tracks, 0)
    setCurrentTrack(tracks[0])
    if (!isPlaying) {
      togglePlay()
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-800 rounded-lg mb-8"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!genre) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Genre not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={`${genre.color} p-8 mb-8`}>
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold text-white mb-4">{genre.name}</h1>
          <p className="text-white/90 text-lg mb-6">Discover the best {genre.name.toLowerCase()} music</p>
          <Button
            onClick={handlePlayGenre}
            className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-3 font-semibold"
          >
            <Play className="h-5 w-5 mr-2" />
            Play {genre.name}
          </Button>
        </div>
      </div>

      <div className="px-6 space-y-8">
        {/* Popular Tracks */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Popular {genre.name} tracks</h2>
          <div className="bg-gray-900/40 rounded-lg p-4">
            <div className="space-y-1">
              {tracks.slice(0, 10).map((track, index) => (
                <TrackCard key={track.id} track={track} index={index} showIndex={true} />
              ))}
            </div>
          </div>
        </section>

        {/* Genre Playlists */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">{genre.name} playlists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        {/* Artists */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Popular {genre.name} artists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {tracks.slice(0, 6).map((track) => (
              <div
                key={`artist-${track.id}`}
                className="bg-gray-900/40 p-4 rounded-lg hover:bg-gray-800/60 transition-colors cursor-pointer text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gray-800 mx-auto mb-3 overflow-hidden">
                  <img
                    src={track.cover || "/placeholder.svg"}
                    alt={track.artist}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-white text-sm truncate">{track.artist}</h3>
                <p className="text-xs text-gray-400">Artist</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
