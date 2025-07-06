"use client"

import { useEffect, useState } from "react"
import { SimplePlaylistCard } from "@/components/simple-playlist-card"
import { TrackCard } from "@/components/track-card"
import { EnhancedHeroBanner } from "@/components/enhanced-hero-banner"
import { getFeaturedPlaylists, mockTracks } from "@/lib/api"
import type { Playlist } from "@/lib/music-store"
import { TrendingUp, Clock, Star, Globe } from "lucide-react"
import { ImageWithFallback } from "@/components/image-with-fallback"

export default function HomePage() {
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const playlists = await getFeaturedPlaylists()
        setFeaturedPlaylists(playlists)
      } catch (error) {
        console.error("Failed to load featured playlists:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                <div className="aspect-square bg-gray-700 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="p-6 space-y-12">
        {/* Enhanced Hero Banner */}
        <EnhancedHeroBanner />

        {/* Welcome Section */}
        <section className="relative">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Good evening</h2>
              <p className="text-gray-400">Discover music from around the world</p>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {featuredPlaylists.slice(0, 6).map((playlist, index) => (
              <div
                key={playlist.id}
                className="group bg-gray-800/40 rounded-lg p-3 hover:bg-gray-700/60 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                    <ImageWithFallback
                      src={playlist.cover || "/placeholder.svg"}
                      alt={playlist.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      fallbackText={playlist.title}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-green-400 transition-colors">
                      {playlist.title}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">{playlist.tracks.length} songs</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Playlists */}
        <section className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <h2 className="text-3xl font-bold text-white">Featured Playlists</h2>
            </div>
            <button className="text-gray-400 hover:text-white font-medium transition-colors">Show all</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredPlaylists.map((playlist) => (
              <SimplePlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section className="relative bg-gray-900/40 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Trending Now</h2>
              <p className="text-gray-400">The hottest tracks across all genres</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              {mockTracks.slice(0, 8).map((track, index) => (
                <TrackCard key={track.id} track={track} index={index} showIndex={true} />
              ))}
            </div>

            <div className="relative">
              <div className="sticky top-4">
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">🔥 Hot Right Now</h3>
                  <div className="space-y-4">
                    {mockTracks.slice(3, 6).map((track, index) => (
                      <div key={track.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
                          <ImageWithFallback
                            src={track.cover || "/placeholder.svg"}
                            alt={track.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            fallbackText={track.title}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{track.title}</p>
                          <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                        </div>
                        <div className="text-green-500 font-bold">#{index + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recently Played */}
        <section className="relative">
          <div className="flex items-center space-x-3 mb-8">
            <Clock className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-white">Recently Played</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mockTracks.slice(0, 6).map((track) => (
              <div
                key={track.id}
                className="group bg-gray-900/40 p-4 rounded-xl hover:bg-gray-800/60 transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 mb-3 relative">
                  <ImageWithFallback
                    src={track.cover || "/placeholder.svg"}
                    alt={track.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    fallbackText={track.title}
                  />
                </div>
                <h3 className="font-medium text-white text-sm mb-1 truncate group-hover:text-green-400 transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs text-gray-400 truncate">{track.artist}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
