// Federal Contract Spending — ranked horizontal bar chart (navy gradient, dark→light by rank)
export function GovSpendingIcon() {
  const bars = [
    { w: 192, fill: '#0f1d2e', label: 'LMT' },
    { w: 164, fill: '#1c3550', label: 'RTX' },
    { w: 136, fill: '#2d5278', label: 'BA'  },
    { w: 110, fill: '#426ea0', label: 'NOC' },
    { w: 84,  fill: '#6090b4', label: 'GD'  },
    { w: 58,  fill: '#8fb4cc', label: 'HII' },
    { w: 34,  fill: '#c0d4e4', label: 'L3H' },
  ]

  const barH = 22
  const gap  = 9
  const totalH = bars.length * barH + (bars.length - 1) * gap  // 208px
  const startY = Math.round((240 - totalH) / 2)                 // 16
  const axisX  = 56

  const gridXs = [axisX + 48, axisX + 96, axisX + 144, axisX + 192]

  return (
    <svg
      viewBox="0 0 300 240"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <rect width="300" height="240" fill="#ffffff" />

      {gridXs.map(x => (
        <line key={x} x1={x} y1={startY} x2={x} y2={startY + totalH}
          stroke="#0f1d2e" strokeWidth="0.4" opacity="0.1" />
      ))}

      <line x1={axisX} y1={startY - 4} x2={axisX} y2={startY + totalH + 4}
        stroke="#0f1d2e" strokeWidth="0.8" opacity="0.2" />

      {bars.map(({ w, fill, label }, i) => {
        const y = startY + i * (barH + gap)
        const textFill = i < 5 ? '#ffffff' : '#0f1d2e'
        return (
          <g key={i}>
            <text
              x={axisX - 6}
              y={y + barH / 2 + 4}
              textAnchor="end"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="600"
              fill="#0f1d2e"
              opacity="0.55"
            >{label}</text>
            <rect x={axisX} y={y} width={w} height={barH} fill={fill} />
            <text
              x={axisX + w - 6}
              y={y + barH / 2 + 3.5}
              textAnchor="end"
              fontSize="7.5"
              fontFamily="monospace"
              fill={textFill}
              opacity="0.6"
            >{['$124B','$98B','$76B','$55B','$38B','$24B','$14B'][i]}</text>
          </g>
        )
      })}
    </svg>
  )
}
