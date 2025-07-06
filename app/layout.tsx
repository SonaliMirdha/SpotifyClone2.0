import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { MusicPlayer } from "@/components/music-player"
import { MusicProvider } from "@/lib/music-store"
import { FloatingMusicVisualizer } from "@/components/floating-music-visualizer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spotify 2.0 - Global Music Experience",
  description: "Stream music from around the world - Bollywood, Punjabi, International hits and more",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white overflow-hidden`}>
        <MusicProvider>
          <div className="flex h-screen relative z-10">
            <Sidebar />
            <main className="flex-1 overflow-y-auto pb-24">{children}</main>
          </div>
          <MusicPlayer />
          <FloatingMusicVisualizer />
        </MusicProvider>
      </body>
    </html>
  )
}
