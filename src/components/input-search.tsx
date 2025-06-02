'use client'

import { redirect } from 'next/navigation'
import { useState } from 'react'
import { LuSearch } from 'react-icons/lu'

export default function SearchCity() {
  const [city, setCity] = useState('')

  function handleSearchCity() {
    setCity('')
    redirect(`/${city}`)
  }

  return (
    <form
      action={handleSearchCity}
      className="group px-5 flex items-center gap-2"
    >
      <label htmlFor="cidade">
        <LuSearch
          size={20}
          className="text-slate-500 group-target:text-slate-700"
        />
      </label>
      <input
        type="text"
        name="cidade"
        id="cidade"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Busque por sua cidade"
        className="py-5 w-full focus:outline-0 placeholder:text-slate-500 font-medium text-slate-500 group-target:text-slate-700"
      />
    </form>
  )
}
