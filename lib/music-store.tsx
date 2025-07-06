"use client"

import { create } from "zustand"
import { createContext, useContext, type ReactNode } from "react"

export interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  cover: string
  preview_url: string
}

export interface Playlist {
  id: string
  title: string
  description: string
  cover: string
  tracks: Track[]
  creator: string
}

interface MusicState {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isShuffled: boolean
  isRepeated: boolean
  queue: Track[]
  currentIndex: number

  // Actions
  setCurrentTrack: (track: Track) => void
  togglePlay: () => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  nextTrack: () => void
  previousTrack: () => void
  setQueue: (tracks: Track[], startIndex?: number) => void
}

const useMusicStore = create<MusicState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isShuffled: false,
  isRepeated: false,
  queue: [],
  currentIndex: 0,

  setCurrentTrack: (track) => set({ currentTrack: track }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),
  toggleRepeat: () => set((state) => ({ isRepeated: !state.isRepeated })),

  nextTrack: () => {
    const { queue, currentIndex, isShuffled } = get()
    if (queue.length === 0) return

    let nextIndex
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * queue.length)
    } else {
      nextIndex = (currentIndex + 1) % queue.length
    }

    set({
      currentIndex: nextIndex,
      currentTrack: queue[nextIndex],
      currentTime: 0,
    })
  },

  previousTrack: () => {
    const { queue, currentIndex } = get()
    if (queue.length === 0) return

    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1
    set({
      currentIndex: prevIndex,
      currentTrack: queue[prevIndex],
      currentTime: 0,
    })
  },

  setQueue: (tracks, startIndex = 0) => {
    set({
      queue: tracks,
      currentIndex: startIndex,
      currentTrack: tracks[startIndex] || null,
    })
  },
}))

const MusicContext = createContext<ReturnType<typeof useMusicStore> | null>(null)

export function MusicProvider({ children }: { children: ReactNode }) {
  const store = useMusicStore()

  return <MusicContext.Provider value={store}>{children}</MusicContext.Provider>
}

export function useMusicContext() {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error("useMusicContext must be used within MusicProvider")
  }
  return context
}
