"use client"

import { useState } from "react"
import Link from "next/link"
import { genres } from "@/lib/api"
import { Music, Users, Disc, Radio } from "lucide-react"

const iconMap = {
  Pop: Music,
  Rock: Disc,
  "Hip Hop": Users,
  Electronic: Radio,
  Jazz: Music,
  Classical: Music,
  "R&B": Users,
  Country: Disc,
}

export default function GenresPage() {
  const [hoveredGenre, setHoveredGenre] = useState<string | null>(null)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Browse all</h1>
        <p className="text-gray-400">Explore music by genre</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {genres.map((genre) => {
          const IconComponent = iconMap[genre.name as keyof typeof iconMap] || Music

          return (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}`}
              onMouseEnter={() => setHoveredGenre(genre.id)}
              onMouseLeave={() => setHoveredGenre(null)}
              className="block"
            >
              <div
                className={`
                  ${genre.color} rounded-lg p-6 cursor-pointer transition-all duration-300 relative overflow-hidden h-32
                  ${hoveredGenre === genre.id ? "scale-105 shadow-2xl" : "hover:scale-102"}
                `}
              >
                <h3 className="font-bold text-white text-xl mb-2">{genre.name}</h3>
                <IconComponent
                  className={`
                    absolute bottom-2 right-2 h-12 w-12 text-white/60 transition-all duration-300
                    ${hoveredGenre === genre.id ? "rotate-12 scale-110" : "rotate-6"}
                  `}
                />

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/10 rounded-full"></div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Featured Genre Playlists */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Popular in genres</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.slice(0, 6).map((genre) => (
            <div
              key={`featured-${genre.id}`}
              className="bg-gray-900/40 rounded-lg p-4 hover:bg-gray-800/60 transition-colors cursor-pointer"
            >
              <div className={`${genre.color} rounded-md p-4 mb-4`}>
                <h3 className="font-bold text-white text-lg">Best of {genre.name}</h3>
                <p className="text-white/80 text-sm">The biggest hits in {genre.name.toLowerCase()}</p>
              </div>
              <p className="text-gray-400 text-sm">Curated playlist • 50 songs</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
