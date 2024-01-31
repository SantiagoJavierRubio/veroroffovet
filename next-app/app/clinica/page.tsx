import Image from 'next/image'
import Container from '@/components/Container'
import { ContactForm } from './_components/ContactForm'
import Photo from '@/components/Photo'

import { prisma } from '@/prisma/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atencion a domicilio'
}

export default async function Clinica() {
  const barrios = await prisma.barrio.findMany({
    orderBy: {
      distritoName: 'asc'
    }
  })
  const BARRIOS_CABA = barrios.filter(b => b.distritoName === 'caba')
  const BARRIOS_BSAS = barrios.filter(b => b.distritoName === 'provincia')

  return (
    <>
      <h1 className="text-primary mb-0 text-center text-5xl font-bold sm:text-6xl">
        Atención a domicilio
      </h1>
      <Container>
        <article className="text-primary relative mb-8 sm:ml-8">
          <h3 className="my-4 text-3xl underline">Servicios</h3>
          <p className="text-primary ml-2 text-base font-normal italic">
            Para felinos y caninos
          </p>
          <ul className="ml-12 mt-2 list-disc">
            <li className="border-primary my-2 text-xl">Vacunaciones</li>
            <li className="border-primary my-2 text-xl">
              Análisis de laboratorio
            </li>
            <li className="border-primary my-2 text-xl">
              Certificados de salud
            </li>
          </ul>
          <p className="ml-2 text-base font-normal italic text-red-600">
            Agenda para consultas clínicas cerrada
          </p>
          <Photo
            src="/photos/veroycabra.jpeg"
            alt="con un paciente"
            className="border-terciary absolute top-0 right-6 w-32 border-2 shadow-2xl sm:w-64 md:w-72"
          />
        </article>
        <article className="text-primary mb-8 sm:mx-8">
          <h3 className="my-4 text-3xl underline">Zonas</h3>
          <div className="flex flex-wrap justify-evenly gap-6">
            <div className="w-96 max-w-full grow" id="zonas-clinica">
              <h4 className="text-center text-xl">Capital Federal</h4>
              <div className="relative m-auto aspect-square w-full">
                <div className="absolute inset-0 z-10 rounded-md p-4 opacity-0 transition-all hover:bg-black/80 hover:opacity-100">
                  <ul className="flex-center flex h-full shrink flex-wrap items-center justify-evenly gap-6 text-lg font-bold text-stone-100">
                    {BARRIOS_CABA.map(barrio => (
                      <li key={barrio.name}>{barrio.name}</li>
                    ))}
                  </ul>
                </div>
                <Image
                  src="https://res.cloudinary.com/dxpkhydol/image/upload/v1688567888/caba.png"
                  alt="Zonas de C.A.B.A."
                  fill
                  className="rounded-md"
                  sizes="24rem"
                  priority
                />
              </div>
            </div>
            <div className="w-96 max-w-full grow">
              <h4 className="text-center text-xl">Buenos Aires, zona norte</h4>
              <div className="relative m-auto aspect-square w-full">
                <div className="absolute inset-0 z-10 rounded-md p-4 opacity-0 transition-all hover:bg-black/80 hover:opacity-100">
                  <ul className="flex-center flex h-full shrink flex-wrap items-center justify-evenly gap-6 text-lg font-bold text-stone-100">
                    {BARRIOS_BSAS.map(barrio => (
                      <li key={barrio.name}>{barrio.name}</li>
                    ))}
                  </ul>
                </div>
                <Image
                  src="https://res.cloudinary.com/dxpkhydol/image/upload/v1688567947/provincia.png"
                  alt="Zonas de C.A.B.A."
                  fill
                  className="rounded-md"
                  sizes="24rem"
                />
              </div>
            </div>
          </div>
        </article>
        <ContactForm />
      </Container>
    </>
  )
}
