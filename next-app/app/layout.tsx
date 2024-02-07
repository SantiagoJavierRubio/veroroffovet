import React from 'react'
import { Metadata } from 'next'
import { Rubik } from 'next/font/google'

import '@/app/_lib/styles/globals.css'

import NavBar from './_components/layout/NavBar/NavBar'
import Footer from './_components/layout/Footer'

const DEFAULT_TITLE = 'Veronica Roffo - Veterinaria'
const DEFAULT_DESCRIPTION =
  'Asesorias nutricionales y veterinaria clínica. Buenos Aires - Argentina'

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    images: 'https://www.veronicanutrivet.com.ar/VR_logo.png',
    siteName: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: 'article'
  },
  manifest: '/site.webmanifest',
  authors: {
    name: 'Santiago Javier Rubio',
    url: 'https://github.com/SantiagoJavierRubio'
  }
}

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={rubik.className}>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <body>
        <NavBar />
        <main className="mb-32 min-h-screen w-full max-w-full sm:mt-32 sm:mb-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
