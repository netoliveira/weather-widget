import { LuLink2Off } from 'react-icons/lu'
import SearchCity from './input-search'

export default function NotFoundCity() {
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
