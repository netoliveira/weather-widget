export type WeatherItemProps = {
  dt: string | number
  temp: string | number
  alt: string
  hour: string | number
  icon: string
  weather: {
    description: string
    icon: string
  }[]
}
