import Layout from '@/components/Layout/Layout'
import Image from 'next/image'

export default function Home() {
  return (
    <Layout>
      <h1 className="mt-4 text-center text-6xl font-bold text-primary">
        Veronica Roffo - Veterinaria
      </h1>
      <Image
        src="/VR_logo.png"
        width={300}
        height={300}
        alt="logo"
        className="fixed bottom-4 right-4"
      />
    </Layout>
  )
}
