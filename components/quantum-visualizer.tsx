"use client"

import { useEffect, useRef, useState } from "react"
import { useMusicContext } from "@/lib/music-store"

export function QuantumVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isPlaying, currentTrack } = useMusicContext()
  const [particles, setParticles] = useState<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      life: number
      maxLife: number
    }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number

    const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#ef4444", "#f59e0b", "#ec4899"]

    const createParticle = (x: number, y: number) => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 100 + 50,
    })

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (isPlaying && currentTrack) {
        // Create new particles
        if (Math.random() < 0.3) {
          const newParticles = Array.from({ length: 3 }, () =>
            createParticle(Math.random() * canvas.width, Math.random() * canvas.height),
          )
          setParticles((prev) => [...prev.slice(-100), ...newParticles])
        }
      }

      // Update and draw particles
      setParticles((prev) =>
        prev
          .map((particle) => {
            particle.x += particle.vx
            particle.y += particle.vy
            particle.life++

            // Quantum tunneling effect
            if (particle.x < 0) particle.x = canvas.width
            if (particle.x > canvas.width) particle.x = 0
            if (particle.y < 0) particle.y = canvas.height
            if (particle.y > canvas.height) particle.y = 0

            // Draw particle with quantum glow
            const alpha = 1 - particle.life / particle.maxLife
            ctx.save()
            ctx.globalAlpha = alpha

            // Outer glow
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
            ctx.fillStyle = particle.color + "20"
            ctx.fill()

            // Inner core
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle = particle.color
            ctx.fill()

            ctx.restore()

            return particle
          })
          .filter((particle) => particle.life < particle.maxLife),
      )

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPlaying, currentTrack])

  if (!currentTrack) return null

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ mixBlendMode: "screen" }} />
}
