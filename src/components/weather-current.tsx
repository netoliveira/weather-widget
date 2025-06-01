import Image from 'next/image'

interface WeatherCurrentProps {
  icon: string
  alt: string
  city: string
  temp: string
  minTemp: string
  maxTemp: string
}

export default function WeatherCurrent(props: WeatherCurrentProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full">
      <div>
        <Image
          src={`https://openweathermap.org/img/wn/${props.icon}@4x.png`}
          width={200}
          height={200}
          alt={props.alt}
        />
      </div>
      <div className="text-slate-800 text-center">
        <h1 className="text-3xl">{props.city}</h1>
        <h2 className="text-7xl">{props.temp}ºC</h2>
        <div className="flex items-center justify-center gap-10 font-semibold">
          <span>Mín.: {props.minTemp}ºC</span>
          <span>Máx.: {props.maxTemp}ºC</span>
        </div>
      </div>
    </div>
  )
}
