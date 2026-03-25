// Federal Housing & Construction — US state spending treemap (same navy gradient as GovSpending)
export function GovHousingIcon() {
  const row1 = [
    { label: 'CA', sublabel: '$95B', w: 110, fill: '#0f1d2e', text: '#ffffff' },
    { label: 'TX', sublabel: '$68B', w:  82, fill: '#1c3550', text: '#ffffff' },
    { label: 'NY', sublabel: '$62B', w:  62, fill: '#2d5278', text: '#ffffff' },
    { label: 'FL', sublabel: '$42B', w:  36, fill: '#426ea0', text: '#ffffff' },
  ]
  const row2 = [
    { label: 'IL', w: 48, fill: '#6090b4', text: '#ffffff' },
    { label: 'PA', w: 42, fill: '#7aa8c8', text: '#ffffff' },
    { label: 'OH', w: 37, fill: '#96bcd6', text: '#0f1d2e' },
    { label: 'GA', w: 33, fill: '#aecce0', text: '#0f1d2e' },
    { label: 'NC', w: 30, fill: '#c0d8e8', text: '#0f1d2e' },
    { label: 'WA', w: 27, fill: '#cee2ee', text: '#0f1d2e' },
    { label: '+44',w: 73, fill: '#deeef6', text: '#0f1d2e' },
  ]

  const gap    = 3
  const padX   = 5
  const h1     = 102
  const h2     = 100
  const rowGap = 3
  const startY = Math.round((240 - h1 - rowGap - h2) / 2)  // 17

  const computeX = (items: { w: number }[]) => {
    const xs: number[] = []
    let x = padX
    items.forEach(({ w }, i) => { xs.push(x); x += w + (i < items.length - 1 ? gap : 0) })
    return xs
  }
  const row1X = computeX(row1)
  const row2X = computeX(row2)

  return (
    <svg
      viewBox="0 0 300 240"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <rect width="300" height="240" fill="#ffffff" />

      {row1.map(({ label, sublabel, w, fill, text }, i) => {
        const x = row1X[i]
        const y = startY
        return (
          <g key={label}>
            <rect x={x} y={y} width={w} height={h1} fill={fill} />
            <text x={x + w / 2} y={y + h1 / 2 - 5} textAnchor="middle"
              fontSize="13" fontFamily="monospace" fontWeight="700" fill={text} opacity="0.92"
            >{label}</text>
            <text x={x + w / 2} y={y + h1 / 2 + 11} textAnchor="middle"
              fontSize="8" fontFamily="monospace" fill={text} opacity="0.55"
            >{sublabel}</text>
          </g>
        )
      })}

      {row2.map(({ label, w, fill, text }, i) => {
        const x = row2X[i]
        const y = startY + h1 + rowGap
        return (
          <g key={label}>
            <rect x={x} y={y} width={w} height={h2} fill={fill} />
            <text x={x + w / 2} y={y + h2 / 2 + 4} textAnchor="middle"
              fontSize={w >= 60 ? 11 : 9} fontFamily="monospace" fontWeight="600"
              fill={text} opacity="0.85"
            >{label}</text>
          </g>
        )
      })}
    </svg>
  )
}
