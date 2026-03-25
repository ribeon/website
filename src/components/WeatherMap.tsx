'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import { REGIONS } from '@/lib/data/regions'
import type { WeatherSignalRow } from '@/lib/data/weather-signals-sample'

interface WeatherMapProps {
  data: WeatherSignalRow[]
  selectedSignal: keyof Omit<WeatherSignalRow, 'date' | 'region'>
  selectedDate: string
}

function signalColor(value: number | undefined, signal: string): string {
  if (value === undefined) return 'rgba(196, 185, 154, 0.35)'

  const isRank = signal === 'composite_rank' || signal.endsWith('_rank')

  if (isRank) {
    if (value > 0.65) return 'rgba(22, 101, 52, 0.5)'   // dark forest green
    if (value < 0.35) return 'rgba(153, 27, 27, 0.5)'   // dark crimson
    return 'rgba(154, 119, 40, 0.4)'                     // antique gold neutral
  }

  if (value > 0) return 'rgba(22, 101, 52, 0.5)'
  if (value < 0) return 'rgba(153, 27, 27, 0.5)'
  return 'rgba(154, 119, 40, 0.4)'
}

export function WeatherMap({ data, selectedSignal, selectedDate }: WeatherMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletRef = useRef<{
    map: L.Map | null
    rectangles: L.Rectangle[]
  }>({ map: null, rectangles: [] })
  const [isClient, setIsClient] = useState(false)

  // Index data by region for the selected date
  const signalByRegion = useMemo(() => {
    const index: Record<string, number> = {}
    for (const row of data) {
      if (row.date === selectedDate) {
        index[row.region] = row[selectedSignal] as number
      }
    }
    return index
  }, [data, selectedDate, selectedSignal])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mapRef.current) return

    let cancelled = false

    async function initMap() {
      const L = (await import('leaflet')).default

      // Fix default icon paths for Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      if (cancelled || !mapRef.current) return

      // Destroy previous instance
      if (leafletRef.current.map) {
        leafletRef.current.map.remove()
        leafletRef.current.map = null
        leafletRef.current.rectangles = []
      }

      const map = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        },
      ).addTo(map)

      leafletRef.current.map = map

      for (const region of REGIONS) {
        const value = signalByRegion[region.id]
        const color = signalColor(value, selectedSignal)

        const rect = L.rectangle(region.bounds, {
          color: '#0f1d2e',
          weight: 1,
          fillColor: color,
          fillOpacity: 0.8,
        }).addTo(map)

        const valueLabel =
          value !== undefined
            ? typeof value === 'number' && (selectedSignal === 'composite_rank' || selectedSignal.endsWith('_rank'))
              ? value.toFixed(2)
              : value.toFixed(3)
            : 'no sample data'

        rect.bindTooltip(
          `<div style="font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.6">
            <strong>${region.name}</strong><br/>
            Commodities: ${region.commodities.join(', ')}<br/>
            ${selectedSignal}: ${valueLabel}
          </div>`,
          { sticky: true, opacity: 1 },
        )

        leafletRef.current.rectangles.push(rect)
      }
    }

    initMap()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient])

  // Update rectangle colors when signal/date changes (without recreating the map)
  useEffect(() => {
    if (!leafletRef.current.map) return

    REGIONS.forEach((region, i) => {
      const rect = leafletRef.current.rectangles[i]
      if (!rect) return

      const value = signalByRegion[region.id]
      const color = signalColor(value, selectedSignal)
      rect.setStyle({ fillColor: color })

      const valueLabel =
        value !== undefined
          ? typeof value === 'number' && (selectedSignal === 'composite_rank' || selectedSignal.endsWith('_rank'))
            ? value.toFixed(2)
            : value.toFixed(3)
          : 'no sample data'

      rect.setTooltipContent(
        `<div style="font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.6">
          <strong>${region.name}</strong><br/>
          Commodities: ${region.commodities.join(', ')}<br/>
          ${selectedSignal}: ${valueLabel}
        </div>`,
      )
    })
  }, [signalByRegion, selectedSignal])

  if (!isClient) {
    return (
      <div
        style={{
          width: '100%',
          height: '400px',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          color: 'var(--muted)',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        Loading map...
      </div>
    )
  }

  return (
    <>
      {/* Leaflet CSS */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '400px',
          border: '1px solid var(--border)',
        }}
      />
    </>
  )
}
