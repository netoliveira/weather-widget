import WeatherWidget from '@/components/widget'

export default function CityPage({ params }: { params: { city: string } }) {
  return <WeatherWidget city={decodeURIComponent(params.city)} />
}
