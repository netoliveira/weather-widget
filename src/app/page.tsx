'use client'

import SearchCity from '@/components/input-search'
import { useEffect, useState } from 'react'

export default function Home() {
  const [coords, setCoords] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCoords({ latitude, longitude })
        },
        (error) => {
          console.error(`Erro ao obter localização: ${error.message}`)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    } else {
      console.warn('Geolocalização não suportada pelo navegador.')
    }
  }, [])

  return (
    <section className="w-full max-w-[712px] bg-white/20 backdrop-blur-sm rounded-2xl border border-white/32">
      <SearchCity />
      {coords && (
        <div className="text-white p-4">
          Latitude: {coords.latitude}, Longitude: {coords.longitude}
        </div>
      )}
    </section>
  )
}
