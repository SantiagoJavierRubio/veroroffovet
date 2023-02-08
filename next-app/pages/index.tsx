import Container from '@/components/Container'
import Layout from '@/components/Layout/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const rgb2hex = (rgb: string) =>
  `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    ?.slice(1)
    .map(n => parseInt(n, 10).toString(16).padStart(2, '0'))
    .join('')}`

export default function Home() {
  const [docBg, setDocBg] = useState<string>('inherit')
  useEffect(() => {
    const rgb = window.getComputedStyle(document.body)['backgroundColor']
    setDocBg(rgb2hex(rgb))
  }, [])
  return (
    <Layout>
      <h1 className="text-primary text-center text-5xl font-bold">
        Veronica Roffo
      </h1>
      <h2 className="text-secondary font-base text-center text-xl">
        Veterinaria orientada a nutricion natural de perros y gatos.
      </h2>
      <Container>
        <section className="flex flex-col gap-8">
          <div className="border-terciary/75 w-full rounded-md border-2 p-6 pb-8">
            <h3
              className={`text-primary -mt-10 w-fit px-2 text-xl font-bold ${
                'bg-[' + docBg + ']'
              }`}
            >
              Asesorias nutricionales
            </h3>
            <div className="text-primary flex flex-col items-center justify-evenly gap-6 text-xl">
              <div className="flex items-center gap-4 pt-4">
                <div className="relative h-16 w-16">
                  <Image src="/svgs/online.svg" fill alt="consultas online" />
                </div>
                <p>Online desde cualquier lugar del mundo</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16">
                  <Image
                    src="/svgs/dry-dog-food.svg"
                    fill
                    alt="consultas online"
                  />
                </div>
                <p>
                  Dietas BARF, natural cocida, mixta y suplementacion de
                  ultraprocesados
                </p>
              </div>
              <div className="flex items-center gap-4 ">
                <div className="relative h-8 w-8">
                  <Image src="/svgs/cat.svg" fill alt="consultas online" />
                </div>
                <p>Consultas personalizadas, materiales y recursos utiles</p>
                <div className="relative h-8 w-8">
                  <Image src="/svgs/husky.svg" fill alt="consultas online" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-terciary/75 w-full rounded-md border-2 p-6">
            <h3
              className={`text-primary -mt-10 w-fit px-2 text-xl font-bold ${
                'bg-[' + docBg + ']'
              }`}
            >
              Consultas clinicas
            </h3>
            <div className="text-primary flex flex-col items-center justify-evenly gap-6 text-xl">
              <div className="flex items-center gap-4 pt-4">
                <div className="relative h-16 w-16">
                  <Image
                    src="/svgs/cat-house.svg"
                    fill
                    alt="consultas online"
                  />
                </div>
                <p>
                  A domicilio{' '}
                  <Link
                    className="hover:text-secondary underline"
                    href="/clinica#zonas-clinica"
                  >
                    (revisar zonas)
                  </Link>
                </p>
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src="/svgs/female-doctor.svg"
                      fill
                      alt="consultas online"
                    />
                  </div>
                  <p>
                    Diagnosticos, tratamientos, vacunaciones, certificados, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="m-auto mt-4 flex max-w-xl flex-col items-stretch justify-start">
          <p className="border-secondary/50 text-primary w-fit self-center rounded-md border-2 p-4 text-lg font-bold italic">
            &ldquo;Si te interesa mejorar la vida de tu compa de cuatro patas no
            dudes en contactarme!&ldquo;
          </p>
          <div className="bg-secondary z-10 -mt-4 mr-0 self-end rounded-lg p-4 text-center text-base italic text-stone-100 sm:-mr-8">
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
