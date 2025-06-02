import SearchCity from './input-search'
import NotFoundCity from './not-found-city'
import WeatherCurrent from './weather-current'
import WeatherItem from './weather-hour-item'

interface WeatherWidgetProps {
  city: string
}

export default async function WeatherWidget(props: WeatherWidgetProps) {
  const city = props.city

  const options = {
    method: 'GET',
  }
  const searchCityDaily = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_WEATHER}/2.5/weather?q=${city}&appid=${process.env.PRIVATE_KEY_API_WEATHER}&units=metric&lang=pt_br`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err))

  if (!searchCityDaily.coord) {
    return <NotFoundCity />
  }

  const lat = searchCityDaily.coord.lat
  const lon = searchCityDaily.coord.lon

  const searchCityDailyHour = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API_WEATHER}/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.PRIVATE_KEY_API_WEATHER}&units=metric&lang=pt_br`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err))

  const WeatherWidgetItems = []
  for (let i = 1; i < 13; i++) {
    WeatherWidgetItems.push(searchCityDailyHour.hourly[i])
  }

  function convertHourStamp(value: number) {
    const hourStamp = new Date(value * 1000)
    const hourConvert = hourStamp.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
    })
    return hourConvert
  }

  return (
    <>
      <section className="w-full max-w-[712px] bg-white/20 backdrop-blur-sm rounded-2xl border border-white/32">
        <SearchCity />
        <div className="px-10 pb-10 md:py-10 flex flex-col items-center justify-center border-t border-white/20">
          <WeatherCurrent
            city={searchCityDaily.name}
            temp={searchCityDaily.main.temp.toFixed(0)}
            minTemp={searchCityDaily.main.temp_min.toFixed(0)}
            maxTemp={searchCityDaily.main.temp_max.toFixed(0)}
            icon={searchCityDaily.weather[0].icon}
            alt={searchCityDaily.weather[0].description}
          />
          <ul
            id="temp-hours"
            className="py-5 flex items-center justify-start gap-2 w-full md:w-fit overflow-y-auto"
          >
            {WeatherWidgetItems.map((item) => {
              const hour = convertHourStamp(item.dt)

              return (
                <WeatherItem
                  key={item.dt}
                  hour={Number(hour)}
                  temp={item.temp.toFixed(0)}
                  icon={item.weather[0].icon}
                  description={item.weather[0].description}
                />
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
