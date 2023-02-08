import Container from '@/components/Container'
import Layout from '@/components/Layout/Layout'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <h1 className="text-primary text-center text-5xl font-bold">
        Veronica Roffo
      </h1>
      <h2 className="text-secondary font-base text-center text-xl">
        Veterinaria orientada a nutricion natural de perros y gatos.
      </h2>
      <Container>
        <section>
          <div>
            <h3 className="text-primary text-xl font-bold ">
              Asesorias nutricionales
            </h3>
            <div>
              <ul>
                <li>Online desde cualquier lugar del mundo</li>
                <li>
                  Dietas BARF, natural cocida, mixta y suplementacion de
                  ultraprocesados
                </li>
                <li>Consultas personalizadas, materiales y recursos utiles</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-primary text-xl font-bold">
              Consultas clinicas
            </h3>
            <div>
              <ul>
                <li>
                  A domicilio{' '}
                  <Link
                    className="hover:text-secondary underline"
                    href="/clinica#zonasClinica"
                  >
                    (revisar zonas)
                  </Link>
                </li>
                <li>
                  Diagnosticos, tratamientos, vacunaciones, certificados, etc.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className="m-auto mt-4 flex max-w-xl flex-col items-stretch justify-start">
          <p className="border-secondary/20 text-primary w-fit self-center rounded-md border-2 p-4 text-lg font-bold italic">
            &ldquo;Si te interesa mejorar la vida de tu compa de cuatro patas no
            dudes en contactarme!&ldquo;
          </p>
          <div className="bg-secondary z-10 -mt-4 mr-0 self-end rounded-lg border-2 p-4 text-center text-base italic text-stone-100 sm:-mr-8">
            <p>Veronica Roffo</p>
            <p>Veterinaria - U.B.A.</p>
            <p>M.N. 10468</p>
          </div>
        </div>
        <div>TESTIMONIOS</div>
      </Container>
      <aside className="fixed -right-10 -bottom-8 z-20 hidden rounded-full sm:block md:h-56 md:w-56 lg:-right-8 lg:h-72 lg:w-72 xl:-bottom-4 xl:-right-6">
        <Image
          src="/VR_logo_noback.png"
          fill
          alt="logo"
          sizes="(min-width: 768px) 14rem, (min-width: 1024px) 18rem"
          placeholder="blur"
          blurDataURL="/VR_logo_noback.png"
        />
      </aside>
    </Layout>
  )
}
