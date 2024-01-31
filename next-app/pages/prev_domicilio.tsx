import Layout from '@/components/Layout/Layout'
import Image from 'next/image'
import Container from '@/components/Container'
import { ChangeEvent, FormEvent, useState } from 'react'
import Photo from '@/components/Photo'
import useSendingStatus from '@/app/_hooks/useSendingStatus'
import SendButton from '@/components/SendButton'

import { prisma } from '@/prisma/client'
import { Barrio } from '.prisma/client'

interface DomicilioProps {
  barrios: Barrio[]
}

export default function Domicilio({ barrios }: DomicilioProps) {
  const BARRIOS_CABA = barrios.filter(b => b.distritoName === 'caba')
  const BARRIOS_BSAS = barrios.filter(b => b.distritoName === 'provincia')
  return (
    <Layout title="Atención a domicilio">
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
            <div className="w-96 max-w-full grow" id="zonas-domicilio">
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
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const barrios = await prisma.barrio.findMany({
      orderBy: {
        distritoName: 'asc'
      }
    })
    return {
      props: { barrios }
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        barrios: null
      }
    }
  }
}

interface ContactForm {
  nombre: string
  email: string
  celular?: string
  consulta: string
}

const INITIAL_DATA = {
  nombre: '',
  email: '',
  celular: '',
  consulta: ''
}

const ContactForm = () => {
  const [data, setData] = useState<ContactForm>(INITIAL_DATA)
  const { sendingStatus, setSendingStatus, SENDING_STATUS } = useSendingStatus()
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSendingStatus(SENDING_STATUS.SENDING)
    fetch('/api/clinica', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 200) {
          setSendingStatus(SENDING_STATUS.RESPONSE_OK)
          setData(INITIAL_DATA)
        }
      })
      .catch(err => {
        err instanceof Error && setErrorMsg(err.message)
        setSendingStatus(SENDING_STATUS.ERROR)
      })
      .finally(() => {
        setTimeout(() => setSendingStatus(SENDING_STATUS.NULL), 2000)
      })
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.target.id as keyof typeof data
    setData(prevData => ({ ...prevData, [key]: e.target.value }))
  }
  return (
    <form onSubmit={handleSubmit} className="text-primary sm:ml-8">
      <h3 className="text-3xl underline">Contacto</h3>
      <div className="m-auto my-2 grid max-w-sm auto-cols-auto text-lg font-semibold">
        <label htmlFor="nombre">Nombre y apellido</label>
        <input
          type="text"
          id="nombre"
          value={data.nombre.trimStart()}
          onChange={handleChange}
          required
          className="bg-secondary rounded-sm p-2 text-white"
        />
      </div>
      <div className="m-auto my-2 grid max-w-sm auto-cols-auto text-lg font-semibold">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required
          className="bg-secondary rounded-sm p-2 text-white"
        />
      </div>
      <div className="m-auto my-2 grid max-w-sm auto-cols-auto text-lg font-semibold">
        <label htmlFor="celular">
          Celular <span>(opcional)</span>
        </label>
        <input
          id="celular"
          type="tel"
          value={data.celular}
          onChange={handleChange}
          className="bg-secondary rounded-sm p-2 text-white"
        />
      </div>
      <div className="m-auto my-2 grid max-w-sm auto-cols-auto text-lg font-semibold">
        <label htmlFor="consulta">Motivo de consulta</label>
        <textarea
          id="consulta"
          value={data.consulta}
          onChange={handleChange}
          required
          rows={4}
          className="bg-secondary min-h-[4rem] rounded-sm p-2 text-white"
        />
      </div>
      <div className="m-auto my-4 flex max-w-sm justify-center">
        <SendButton sendingStatus={sendingStatus} errorMessage={errorMsg} />
      </div>
    </form>
  )
}
