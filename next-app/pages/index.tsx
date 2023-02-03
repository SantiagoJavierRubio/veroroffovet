import Layout from '@/components/Layout/Layout'
import Image from 'next/image'

export default function Home() {
  return (
    <Layout>
      <h1 className="text-primary mt-4 text-center text-6xl font-bold">
        Veronica Roffo - Veterinaria
      </h1>
      <Image
        src="/VR_logo_noback.png"
        width={300}
        height={300}
        alt="logo"
        className="bottom-0 right-0 hidden sm:fixed"
        priority
      />
    </Layout>
  )
}
