import WeatherWidget from '@/components/widget'

type SinglePageProps = Promise<{
  cidade: string
}>

export default async function SinglePage(props: { params: SinglePageProps }) {
  const params = await props.params
  const cidade = await params.cidade
  return <WeatherWidget city={cidade} />
}
