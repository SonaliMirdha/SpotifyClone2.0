"use client"

import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { TrackCard } from "@/components/track-card"
import { PlaylistCard } from "@/components/playlist-card"
import { searchTracks, mockPlaylists } from "@/lib/api"
import type { Track } from "@/lib/music-store"
import { Search, Music, Users, Disc } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Track[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)

  const filteredPlaylists = useMemo(() => {
    if (!debouncedQuery) return []
    return mockPlaylists.filter(
      (playlist) =>
        playlist.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        playlist.description.toLowerCase().includes(debouncedQuery.toLowerCase()),
    )
  }, [debouncedQuery])

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setSearchResults([])
        return
      }

      setLoading(true)
      try {
        const results = await searchTracks(debouncedQuery)
        setSearchResults(results)
      } catch (error) {
        console.error("Search failed:", error)
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [debouncedQuery])

  const browseCategories = [
    { name: "Pop", color: "bg-pink-500", icon: Music },
    { name: "Hip Hop", color: "bg-purple-500", icon: Users },
    { name: "Rock", color: "bg-red-500", icon: Disc },
    { name: "Electronic", color: "bg-blue-500", icon: Music },
    { name: "Jazz", color: "bg-yellow-500", icon: Music },
    { name: "Classical", color: "bg-green-500", icon: Music },
    { name: "R&B", color: "bg-orange-500", icon: Users },
    { name: "Country", color: "bg-amber-500", icon: Disc },
  ]

  return (
    <div className="p-6">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white"
          />
        </div>
      </div>

      {/* Search Results */}
      {debouncedQuery && (
        <div className="space-y-8">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          )}

          {!loading && searchResults.length === 0 && filteredPlaylists.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No results found for "{debouncedQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
            </div>
          )}

          {/* Songs Results */}
          {searchResults.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
              <div className="bg-gray-900/40 rounded-lg p-4">
                <div className="space-y-1">
                  {searchResults.slice(0, 10).map((track, index) => (
                    <TrackCard key={track.id} track={track} index={index} showIndex={true} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Playlists Results */}
          {filteredPlaylists.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Browse Categories */}
      {!debouncedQuery && (
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Browse all</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {browseCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div
                  key={category.name}
                  className={`${category.color} rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden`}
                >
                  <h3 className="font-bold text-white text-lg mb-2">{category.name}</h3>
                  <IconComponent className="absolute bottom-2 right-2 h-8 w-8 text-white/80 rotate-12" />
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
