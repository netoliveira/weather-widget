import WeatherWidget from '@/components/widget'

export default async function SinglePage(props: {
  params: Promise<{ cidade: string }>
}) {
  const params = await props.params
  const cidade = await params.cidade
  return <WeatherWidget city={cidade} />
}
