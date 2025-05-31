import { Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

import Image from 'next/image'
import clouds from '../../public/bg-app-clima.jpg'

const poppins = Poppins({
  variable: '--font-poppins-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'APP Clima | netOliveira',
  description:
    'Projeto desenvolvido com o objetivo de estudo. Consumo de API de clima.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} antialiased`}>
        <main className="p-10 flex items-center justify-center h-screen bg-sky-200">
          <Image
            alt="Nuvens"
            src={clouds}
            quality={100}
            fill
            className="w-full h-screen opacity-32 object-cover"
          />
          {children}
        </main>
      </body>
    </html>
  )
}
