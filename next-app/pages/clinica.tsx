import Layout from '@/components/Layout/Layout'
import Image from 'next/image'
import Container from '@/components/Container'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Clinica() {
  return (
    <Layout title="Clinica a domicilio">
      <h1 className="text-primary text-center text-5xl font-bold">
        Clinica a domicilio
      </h1>
      <Container>
        <div className="text-primary mb-8 sm:ml-8">
          <h3 className="my-4 text-3xl underline">Servicios</h3>
          <p className="text-primary ml-2 text-base font-normal italic">
            Para felinos y caninos
          </p>
          <ul className="ml-12 mt-2 list-disc">
            <li className="border-primary my-2 text-xl">Consultas clinicas</li>
            <li className="border-primary my-2 text-xl">Tratamientos</li>
            <li className="border-primary my-2 text-xl">Vacunaciones</li>
            <li className="border-primary my-2 text-xl">
              Analisis de laboratorio
            </li>
            <li className="border-primary my-2 text-xl">
              Certificados de salud
            </li>
          </ul>
        </div>
        <div className="text-primary mb-8 sm:mx-8">
          <h3 className="my-4 text-3xl underline">Zonas</h3>
          <div className="flex flex-wrap justify-evenly gap-6">
            <div className="w-96 max-w-full grow">
              <h4 className="text-center text-xl">Capital Federal</h4>
              <div className="relative m-auto aspect-square w-full">
                <Image
                  src="/maps/capital.jpeg"
                  alt="Zonas de C.A.B.A."
                  fill
                  className="rounded-md"
                  sizes="24rem"
                  priority
                />
              </div>
            </div>
            <div className="w-96 max-w-full grow">
              <h4 className="text-center text-xl">Buenos Aires</h4>
              <div className="relative m-auto aspect-square w-full">
                <Image
                  src="/maps/provincia.jpeg"
                  alt="Zonas de C.A.B.A."
                  fill
                  className="rounded-md"
                  sizes="24rem"
                />
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </Container>
    </Layout>
  )
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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(data)
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
          value={data.nombre}
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
        <label htmlFor="consulta">Tu consulta</label>
        <textarea
          id="consulta"
          value={data.consulta}
          onChange={handleChange}
          required
          rows={4}
          className="bg-secondary rounded-sm p-2 text-white"
        />
      </div>
      <div className="m-auto my-4 flex max-w-sm justify-center">
        <button
          type="submit"
          className="bg-primary m-auto w-1/3 rounded-md p-4 text-lg font-bold text-stone-100"
        >
          Enviar
        </button>
      </div>
    </form>
  )
}
