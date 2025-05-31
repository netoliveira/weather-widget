import type { WeatherItemProps } from '@/types/weather-item-props'
import SearchCity from './input-search'
import WeatherCurrent from './weather-current'
import WeatherItem from './weather-hour-item'
import { LuLink2Off } from 'react-icons/lu'

interface WeatherWidgetProps {
  city: string
}

export default async function WeatherWidget({ city }: WeatherWidgetProps) {
  const options = { method: 'GET' }
  const responseCity = await fetch(
    `${process.env.URL_API_WEATHER}/2.5/weather?q=${
      city ? city : 'Ribeirão+Preto'
    }&appid=${process.env.PRIVATE_KEY_API_WEATHER}&units=metric&lang=pt_br`,
    options
  )
    .then((response) => response.json())
    // .then((response) => console.log(response))
    .catch((err) => console.log(err))

  if (!responseCity.coord || responseCity.cod === '404') {
    return (
      <>
        <section className="w-full max-w-[712px] bg-white/20 backdrop-blur-sm rounded-2xl border border-white/32">
          <SearchCity />
          <div className="px-10 pb-10 md:py-10 flex flex-col items-center justify-center text-slate-700">
            <LuLink2Off size={20} />
            Cidade não encontrada. Tente novamente.
          </div>
        </section>
      </>
    )
  }

  const lat = responseCity.coord.lat
  const lon = responseCity.coord.lon

  const responseCityDaily = await fetch(
    `${process.env.URL_API_WEATHER}/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.PRIVATE_KEY_API_WEATHER}&units=metric&lang=pt_br`,
    options
  )
    .then((response) => response.json())
    // .then((response) => console.log(response))
    .catch((err) => console.error(err))

  const dataItems = responseCityDaily.hourly as WeatherItemProps[]

  return (
    <>
      <section className="w-full max-w-[712px] bg-white/20 backdrop-blur-sm rounded-2xl border border-white/32">
        <SearchCity />
        <div className="px-10 pb-10 md:py-10 flex flex-col items-center justify-center">
          <WeatherCurrent
            alt={responseCityDaily?.current?.weather[0]?.description}
            city={responseCity?.name}
            maxTemp={responseCityDaily?.daily[0]?.temp?.max.toFixed(0)}
            minTemp={responseCityDaily?.daily[0]?.temp?.min.toFixed(0)}
            temp={responseCity?.main?.temp.toFixed(0)}
            icon={responseCityDaily?.current?.weather[0]?.icon}
          />
          <ul
            id="temp-hours"
            className="py-5 flex items-center justify-start gap-2 w-full overflow-y-auto"
          >
            {dataItems.map((item: WeatherItemProps) => {
              const key = item.dt
              const alt = item.weather[0].description
              const hour = item.dt
              const hourConverter = new Date(hour * 1000).toLocaleTimeString(
                'pt-BR',
                {
                  hour: '2-digit',
                }
              )
              const temp = item.temp
              const icon = item.weather[0].icon

              return (
                <WeatherItem
                  key={key}
                  alt={alt}
                  hour={hourConverter}
                  temp={(temp as number).toFixed(0)}
                  icon={icon}
                  dt={''}
                  weather={[]}
                />
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
