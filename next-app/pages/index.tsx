import Layout from "@/components/Layout/Layout"
import Image from "next/image"

export default function Home() {
  return (
    <Layout>
      <h1 className="text-6xl mt-4 font-bold text-primary text-center">Veronica Roffo - Veterinaria</h1>
      <Image src="/VR_logo.png" width={300} height={300} alt="logo" className="fixed bottom-4 right-4"/>
    </Layout>
  )
}
