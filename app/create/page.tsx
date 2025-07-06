"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TrackCard } from "@/components/track-card"
import { mockTracks } from "@/lib/api"
import { useMusicContext } from "@/lib/music-store"
import { Plus, Search, Music, Save, X, Upload } from "lucide-react"

export default function CreatePlaylistPage() {
  const router = useRouter()
  const [playlistName, setPlaylistName] = useState("")
  const [playlistDescription, setPlaylistDescription] = useState("")
  const [selectedTracks, setSelectedTracks] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const { setQueue, setCurrentTrack, togglePlay, isPlaying } = useMusicContext()

  const filteredTracks = mockTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleTrackToggle = (trackId: string) => {
    setSelectedTracks((prev) => (prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]))
  }

  const handleSavePlaylist = () => {
    if (!playlistName.trim()) {
      alert("Please enter a playlist name")
      return
    }

    // In a real app, this would save to a backend
    console.log("Saving playlist:", {
      name: playlistName,
      description: playlistDescription,
      tracks: selectedTracks,
      cover: coverImage,
    })

    alert("Playlist created successfully!")
    router.push("/library")
  }

  const handlePlaySelected = () => {
    const tracks = mockTracks.filter((track) => selectedTracks.includes(track.id))
    if (tracks.length > 0) {
      setQueue(tracks, 0)
      setCurrentTrack(tracks[0])
      if (!isPlaying) {
        togglePlay()
      }
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Playlist</h1>
        <p className="text-gray-400">Build your perfect music collection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Playlist Details */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/40 rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold text-white mb-6">Playlist Details</h2>

            {/* Cover Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image</label>
              <div className="relative">
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-800 border-2 border-dashed border-gray-600 hover:border-gray-500 transition-colors cursor-pointer group">
                  {coverImage ? (
                    <Image src={coverImage || "/placeholder.svg"} alt="Playlist cover" fill className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-gray-300">
                      <Upload className="h-12 w-12 mb-2" />
                      <span className="text-sm">Upload cover image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Playlist Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Playlist Name</label>
              <Input
                type="text"
                placeholder="My Awesome Playlist"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <Textarea
                placeholder="Describe your playlist..."
                value={playlistDescription}
                onChange={(e) => setPlaylistDescription(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 resize-none"
                rows={3}
              />
            </div>

            {/* Stats */}
            <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Selected tracks:</span>
                <span className="text-white font-medium">{selectedTracks.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Total duration:</span>
                <span className="text-white font-medium">
                  {Math.floor(
                    mockTracks
                      .filter((track) => selectedTracks.includes(track.id))
                      .reduce((acc, track) => acc + track.duration, 0) / 60,
                  )}{" "}
                  min
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleSavePlaylist}
                className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold"
                disabled={!playlistName.trim() || selectedTracks.length === 0}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Playlist
              </Button>

              <Button
                onClick={handlePlaySelected}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                disabled={selectedTracks.length === 0}
              >
                <Music className="h-4 w-4 mr-2" />
                Preview Selected
              </Button>

              <Button onClick={() => router.back()} variant="ghost" className="w-full text-gray-400 hover:text-white">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>

        {/* Track Selection */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/40 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add Songs</h2>
              <div className="text-sm text-gray-400">{filteredTracks.length} songs available</div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for songs, artists, or albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            {/* Track List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredTracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedTracks.includes(track.id)
                      ? "bg-green-500/20 border border-green-500/30"
                      : "hover:bg-gray-800/50"
                  }`}
                  onClick={() => handleTrackToggle(track.id)}
                >
                  <div className="flex items-center justify-center w-6 h-6">
                    {selectedTracks.includes(track.id) ? (
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Plus className="h-3 w-3 text-black rotate-45" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-400 rounded-full hover:border-white transition-colors" />
                    )}
                  </div>

                  <div className="flex-1">
                    <TrackCard track={track} index={index} showIndex={false} className="p-0 hover:bg-transparent" />
                  </div>
                </div>
              ))}
            </div>

            {filteredTracks.length === 0 && (
              <div className="text-center py-12">
                <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No songs found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
