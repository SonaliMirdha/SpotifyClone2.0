"use client"

import { PlaylistCard } from "@/components/playlist-card"
import { TrackCard } from "@/components/track-card"
import { mockPlaylists, mockTracks } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Plus, Heart, Grid3X3, List } from "lucide-react"
import { useState } from "react"

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<"all" | "playlists" | "artists" | "albums">("all")

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "playlists", label: "Playlists" },
    { value: "artists", label: "Artists" },
    { value: "albums", label: "Albums" },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Your Library</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Plus className="h-5 w-5 mr-2" />
            Create Playlist
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "text-white" : "text-gray-400 hover:text-white"}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "text-white" : "text-gray-400 hover:text-white"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={filter === option.value ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter(option.value as any)}
            className={
              filter === option.value
                ? "bg-white text-black hover:bg-gray-200"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Quick Access */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Liked Songs</h3>
              <p className="text-white/80 text-sm">{mockTracks.length} liked songs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Played */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Recently played</h2>
        <div className="bg-gray-900/40 rounded-lg p-4">
          <div className="space-y-1">
            {mockTracks.slice(0, 5).map((track, index) => (
              <TrackCard key={track.id} track={track} index={index} showIndex={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Made for You */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Made for you</h2>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {mockPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded bg-gray-800 overflow-hidden">
                  <img
                    src={playlist.cover || "/placeholder.svg"}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">{playlist.title}</h3>
                  <p className="text-sm text-gray-400 truncate">Playlist • {playlist.creator}</p>
                </div>
                <div className="text-sm text-gray-400">{playlist.tracks.length} songs</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
