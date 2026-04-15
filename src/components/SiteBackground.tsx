'use client'

import { useEffect, useRef } from 'react'

// ── Constellation nodes ───────────────────────────────────────────────────────
type Node = {
  x: number; y: number
  vx: number; vy: number
  r: number; rgb: string
}

// ── Parallax star field ───────────────────────────────────────────────────────
type Star = {
  x: number; y: number   // absolute position
  r: number
  opacity: number
  layer: 0 | 1 | 2       // 0=far, 1=mid, 2=near
  rgb: string
}

// Parallax multiplier per layer (near layer moves most)
const PARALLAX = [0.015, 0.038, 0.075] as const
// How many stars per layer
const LAYER_COUNT = [280, 130, 65] as const
// Star size range per layer [min, max]
const LAYER_SIZE: [number, number][] = [[0.15, 0.55], [0.35, 1.0], [0.65, 1.8]]
// Star opacity range per layer [min, max]
const LAYER_ALPHA: [number, number][] = [[0.3, 0.6], [0.45, 0.72], [0.6, 0.95]]

export function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })         // raw target
  const smooth = useRef({ x: 0, y: 0 })        // lerped position

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let nodes: Node[] = []
    let stars: Star[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Reset smooth position to centre so no jump on resize
      smooth.current = { x: canvas.width / 2, y: canvas.height / 2 }
      mouse.current  = { x: canvas.width / 2, y: canvas.height / 2 }
    }

    const init = () => {
      // Constellation nodes
      const isMobile = window.innerWidth < 768
      const density = isMobile ? 28000 : 18000
      const n = Math.min(isMobile ? 40 : 75, Math.floor(canvas.width * canvas.height / density))
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.4,
        rgb: Math.random() > 0.55 ? '0,212,170' : '59,125,255',
      }))

      // Star field: three depth layers
      stars = []
      for (let layer = 0; layer < 3; layer++) {
        const count = Math.floor(LAYER_COUNT[layer] * (isMobile ? 0.7 : 1))
        for (let i = 0; i < count; i++) {
          const [sMin, sMax] = LAYER_SIZE[layer]
          const [aMin, aMax] = LAYER_ALPHA[layer]
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: sMin + Math.random() * (sMax - sMin),
            opacity: aMin + Math.random() * (aMax - aMin),
            layer: layer as 0 | 1 | 2,
            // mostly white, occasional blue tint
            rgb: Math.random() > 0.8 ? '180,210,255' : '255,255,255',
          })
        }
      }
    }

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Smooth-lerp mouse toward actual cursor position
      const lf = 0.045
      smooth.current.x += (mouse.current.x - smooth.current.x) * lf
      smooth.current.y += (mouse.current.y - smooth.current.y) * lf

      const cx = canvas.width  / 2
      const cy = canvas.height / 2
      const dx = smooth.current.x - cx
      const dy = smooth.current.y - cy

      // ── Draw stars far→near (far drawn first, below near) ────────────────
      for (let layer = 0; layer < 3; layer++) {
        const px = -dx * PARALLAX[layer]
        const py = -dy * PARALLAX[layer]

        for (const s of stars) {
          if (s.layer !== layer) continue
          const sx = s.x + px
          const sy = s.y + py
          ctx.beginPath()
          ctx.arc(sx, sy, s.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${s.rgb},${s.opacity})`
          ctx.fill()
        }
      }

      // ── Constellation connections ─────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ddx = nodes[i].x - nodes[j].x
          const ddy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(ddx, ddy)
          if (dist < 135) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(59,125,255,${(1 - dist / 135) * 0.1})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // ── Constellation nodes ───────────────────────────────────────────────
      for (const d of nodes) {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${d.rgb},0.5)`
        ctx.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    resize()
    init()
    frame()

    const onResize = () => { resize(); init() }
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
