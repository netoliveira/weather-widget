export type WeatherItemProps = {
  key: string
  dt: string
  description: string
  temp: string | number
  icon: string
  weather?: {
    description: string
    icon: string
  }[]
}
