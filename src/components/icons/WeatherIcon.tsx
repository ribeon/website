// Weather Commodity Signals — GDD/HDD signal heatmap (cool blue → warm gold, 8 regions × 12 months)
export function WeatherIcon() {
  const regions = ['CORN', 'BRAZ', 'USNE', 'SOPL', 'EUWH', 'BLKS', 'PAMP', 'AUST']
  const months  = ['J','F','M','A','M','J','J','A','S','O','N','D']

  const signals: number[][] = [
    [0.22,0.20,0.38,0.55,0.74,0.90,0.94,0.86,0.64,0.44,0.28,0.20], // Corn Belt
    [0.74,0.80,0.70,0.50,0.30,0.16,0.14,0.22,0.40,0.58,0.72,0.76], // Brazil Soy
    [0.06,0.08,0.24,0.48,0.66,0.76,0.84,0.77,0.56,0.36,0.16,0.08], // US NE
    [0.33,0.36,0.54,0.70,0.86,0.96,0.99,0.92,0.72,0.50,0.36,0.32], // US S Plains
    [0.16,0.20,0.38,0.58,0.76,0.86,0.84,0.68,0.46,0.30,0.20,0.16], // EU Wheat
    [0.14,0.16,0.34,0.54,0.72,0.88,0.92,0.78,0.54,0.32,0.18,0.14], // Black Sea
    [0.64,0.58,0.46,0.30,0.18,0.12,0.14,0.24,0.38,0.56,0.66,0.64], // Pampas
    [0.70,0.64,0.52,0.34,0.20,0.14,0.16,0.26,0.42,0.60,0.72,0.70], // Australia
  ]

  // Cool blue rgb(156,196,216) → warm neutral rgb(224,218,202) → gold rgb(200,152,32)
  // Mirrors the site's navy/gold palette applied as a diverging temperature scale
  const heatColor = (v: number): string => {
    if (v < 0.5) {
      const t = v * 2
      const r = Math.round(156 + t * 68)
      const g = Math.round(196 + t * 22)
      const b = Math.round(216 - t * 14)
      return `rgb(${r},${g},${b})`
    } else {
      const t = (v - 0.5) * 2
      const r = Math.round(224 - t * 24)
      const g = Math.round(218 - t * 66)
      const b = Math.round(202 - t * 170)
      return `rgb(${r},${g},${b})`
    }
  }

  const cellW  = 18
  const cellH  = 22
  const startX = 38   // 34px for labels + 4px gap
  const startY = 26

  return (
    <svg
      viewBox="0 0 300 240"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <rect width="300" height="240" fill="#ffffff" />

      {months.map((m, j) => (
        <text
          key={j}
          x={startX + j * cellW + cellW / 2}
          y={startY - 8}
          textAnchor="middle"
          fontSize="7"
          fontFamily="monospace"
          fill="#0f1d2e"
          opacity="0.38"
        >{m}</text>
      ))}

      {signals.map((row, i) => (
        <g key={i}>
          <text
            x={startX - 5}
            y={startY + i * cellH + cellH / 2 + 2.5}
            textAnchor="end"
            fontSize="7"
            fontFamily="monospace"
            fill="#0f1d2e"
            opacity="0.42"
          >{regions[i]}</text>
          {row.map((v, j) => (
            <rect
              key={j}
              x={startX + j * cellW}
              y={startY + i * cellH}
              width={cellW - 1}
              height={cellH - 1}
              fill={heatColor(v)}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}
