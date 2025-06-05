interface getReposGitHubProps {
  id: number
  name: string
}

async function getReposGitHub() {
  const response = await fetch('https://api.github.com/users/netoliveira/repos')
  return response.json()
}

export default async function Repositorios() {
  const data = await getReposGitHub()
  console.log(data)
  return (
    <div className="flex flex-col text-black">
      <h1 className="text-5xl">Meus repositórios</h1>
      <ul className="mt-10 flex flex-col gap-5">
        {data.map((item: getReposGitHubProps) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
