"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${mousePosition.x * 0.01}px`,
            bottom: `${mousePosition.y * 0.01}px`,
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
            animation: "float 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
