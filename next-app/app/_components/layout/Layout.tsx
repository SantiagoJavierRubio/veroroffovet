import Head from './Head'
import Footer from './Footer'
import NavBar from './NavBar/NavBar'
import { PropsWithChildren } from 'react'

interface LayoutProps {
  title?: string
  description?: string
}

export default function Layout(props: PropsWithChildren<LayoutProps>) {
  const { title, description, children } = props
  return (
    <>
      <Head title={title} description={description} />
      <NavBar />
      <main className="mb-32 min-h-screen w-full max-w-full sm:mt-32 sm:mb-0">
        {children}
      </main>
      <Footer />
    </>
  )
}
