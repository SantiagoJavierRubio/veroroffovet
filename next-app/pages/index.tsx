import Layout from '@/components/Layout/Layout'
import Image from 'next/image'

export default function Home() {
  return (
    <Layout>
      <h1 className="text-primary text-center text-4xl font-bold">
        Veronica Roffo
      </h1>
      <h2>Veterinaria orientada a nutricion natural de perros y gatos.</h2>
      <div>
        <p>Asesorias nutricionales</p>
        <p>Consultas clinicas</p>
        <p>Online y a domicilio</p>
      </div>
      <div>
        <p>
          Si te interesa mejorar la vida de tu compa de cuatro patas no dudes en
          contactarme!
        </p>
        <div>
          <h3>Veronica Roffo</h3>
          <h4>Veterinaria - U.B.A.</h4>
          <p>M.N. 10468</p>
        </div>
      </div>
      <div>TESTIMONIOS</div>
      <div className="fixed -bottom-4 -right-4 hidden sm:block md:h-56 md:w-56 lg:h-72 lg:w-72">
        <Image
          src="/VR_logo_noback.png"
          fill
          alt="logo"
          className=""
          priority
        />
      </div>
    </Layout>
  )
}
