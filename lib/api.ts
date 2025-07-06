import type { Track, Playlist } from "./music-store"

// Enhanced music library with working image URLs
export const mockTracks: Track[] = [
  // International Hits
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    cover: "https://i.scdn.co/image/ab67616d0000b273c06f0e8b33ac2d246158253e",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: 233,
    cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    cover: "https://upload.wikimedia.org/wikipedia/en/9/9c/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  // Bollywood Hits
  {
    id: "4",
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmastra",
    duration: 245,
    cover: "https://upload.wikimedia.org/wikipedia/en/4/4c/Brahmastra_Part_One_Shiva.jpg",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "5",
    title: "Kal Ho Naa Ho",
    artist: "Sonu Nigam",
    album: "Kal Ho Naa Ho",
    duration: 326,
    cover: "https://upload.wikimedia.org/wikipedia/en/6/65/Kal_Ho_Naa_Ho_poster.jpg",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: "6",
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    album: "Aashiqui 2",
    duration: 262,
    cover: "https://upload.wikimedia.org/wikipedia/en/4/4d/Aashiqui_2_poster.jpg",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: "7",
    title: "Raataan Lambiyan",
    artist: "Tanishk Bagchi, Jubin Nautiyal",
    album: "Shershaah",
    duration: 198,
    cover: "https://upload.wikimedia.org/wikipedia/en/0/05/Shershaah_poster.jpg",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  // Punjabi Hits
  {
    id: "8",
    title: "295",
    artist: "Sidhu Moose Wala",
    album: "PBX 1",
    duration: 234,
    cover: "https://images.genius.com/b9b5c6e8c8c8c8c8c8c8c8c8c8c8c8c8.1000x1000x1.jpg",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    id: "9",
    title: "Brown Munde",
    artist: "AP Dhillon, Gurinder Gill",
    album: "Brown Munde",
    duration: 187,
    cover: "https://images.genius.com/a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1.1000x1000x1.jpg",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    id: "10",
    title: "Excuses",
    artist: "AP Dhillon",
    album: "Two Hearts Never Break the Same",
    duration: 156,
    cover: "https://images.genius.com/b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2.1000x1000x1.jpg",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
  {
    id: "11",
    title: "Goat",
    artist: "Diljit Dosanjh",
    album: "G.O.A.T.",
    duration: 201,
    cover: "https://images.genius.com/c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3.1000x1000x1.jpg",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  },
  {
    id: "12",
    title: "Laembadgini",
    artist: "Diljit Dosanjh",
    album: "CON.FI.DEN.TIAL",
    duration: 189,
    cover: "https://images.genius.com/d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4.1000x1000x1.jpg",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
  },
  // More International
  {
    id: "13",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    duration: 200,
    cover: "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
  },
  {
    id: "14",
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: 167,
    cover: "https://upload.wikimedia.org/wikipedia/en/3/3a/Harry_Styles_-_Harry%27s_House.png",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
  },
  {
    id: "15",
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    duration: 238,
    cover: "https://upload.wikimedia.org/wikipedia/en/a/a6/Glass_Animals_-_Dreamland.png",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
  },
]

export const mockPlaylists: Playlist[] = [
  {
    id: "1",
    title: "Today's Top Hits",
    description: "The most played songs right now. Cover: The Weeknd",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    creator: "Spotify",
    tracks: mockTracks.slice(0, 6),
  },
  {
    id: "2",
    title: "Bollywood Central",
    description: "The biggest Bollywood hits and latest releases",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    creator: "Spotify",
    tracks: mockTracks.slice(3, 8),
  },
  {
    id: "3",
    title: "Punjabi Virals",
    description: "Trending Punjabi tracks that are taking over",
    cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
    creator: "Spotify",
    tracks: mockTracks.slice(7, 12),
  },
  {
    id: "4",
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    creator: "Spotify",
    tracks: mockTracks.slice(1, 6),
  },
  {
    id: "5",
    title: "Desi Hip Hop",
    description: "The best of Indian rap and hip hop",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&sat=-100",
    creator: "Spotify",
    tracks: [mockTracks[7], mockTracks[8], mockTracks[9], mockTracks[10]],
  },
  {
    id: "6",
    title: "Romantic Bollywood",
    description: "Love songs that touch your heart",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=500&fit=crop",
    creator: "Spotify",
    tracks: [mockTracks[4], mockTracks[5], mockTracks[6]],
  },
]

export const genres = [
  { id: "1", name: "Pop", color: "bg-pink-500" },
  { id: "2", name: "Rock", color: "bg-red-500" },
  { id: "3", name: "Hip Hop", color: "bg-purple-500" },
  { id: "4", name: "Electronic", color: "bg-blue-500" },
  { id: "5", name: "Bollywood", color: "bg-orange-500" },
  { id: "6", name: "Punjabi", color: "bg-green-500" },
  { id: "7", name: "Jazz", color: "bg-yellow-500" },
  { id: "8", name: "Classical", color: "bg-indigo-500" },
]

// API functions
export async function searchTracks(query: string): Promise<Track[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase()) ||
      track.album.toLowerCase().includes(query.toLowerCase()),
  )
}

export async function getFeaturedPlaylists(): Promise<Playlist[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockPlaylists
}

export async function getPlaylist(id: string): Promise<Playlist | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockPlaylists.find((playlist) => playlist.id === id) || null
}

export async function getTracksByGenre(genreId: string): Promise<Track[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const genre = genres.find((g) => g.id === genreId)
  if (genre?.name === "Bollywood") {
    return mockTracks.slice(3, 8)
  } else if (genre?.name === "Punjabi") {
    return mockTracks.slice(7, 12)
  }
  return mockTracks
}
