import { Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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
        <main
          id="main-app"
          className="p-10 flex items-center justify-center h-screen"
        >
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  )
}
