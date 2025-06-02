import Image from 'next/image'
import { WeatherItemProps } from '@/types/weather-item-props'

export default function WeatherItem(props: WeatherItemProps) {
  return (
    <li className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center gap-0 w-10">
        <span className="text-slate-600 font-bold text-[12px]">
          {props.hour}
        </span>
        <Image
          src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
          width={28}
          height={28}
          alt={'props.description'}
        />
      </div>
      <span className="text-slate-600 font-bold text-sm">{props.temp}ºC</span>
    </li>
  )
}
