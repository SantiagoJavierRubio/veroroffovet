import NavBar from '@/components/Layout/NavBar'
import { Metadata } from 'next'
import React from 'react'
import '../styles/globals.css'
import Footer from '@/components/Layout/Footer'

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
  manifest: '/site.webmanifest'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
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
