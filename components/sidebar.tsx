"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Search, Library, Plus, Heart, Music, Compass } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockPlaylists } from "@/lib/api"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Your Library", href: "/library", icon: Library },
]

const library = [
  { name: "Create Playlist", href: "/create", icon: Plus },
  { name: "Liked Songs", href: "/liked", icon: Heart },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-black border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <Music className="h-8 w-8 text-green-500" />
          <span className="text-xl font-bold">Spotify 2.0</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Library Section */}
      <div className="mt-8 px-3">
        <div className="space-y-1">
          {library.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-800 transition-colors"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Playlists */}
      <div className="mt-8 flex-1">
        <div className="px-6 mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Playlists</h3>
        </div>
        <ScrollArea className="px-3 flex-1">
          <div className="space-y-1">
            {mockPlaylists.map((playlist) => (
              <Link
                key={playlist.id}
                href={`/playlist/${playlist.id}`}
                className="block px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {playlist.title}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Explore Genres */}
      <div className="p-3 border-t border-gray-800">
        <Link
          href="/genres"
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-800 transition-colors"
        >
          <Compass className="mr-3 h-5 w-5" />
          Explore Genres
        </Link>
      </div>
    </div>
  )
}
