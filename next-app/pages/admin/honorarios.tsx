import Container from '@/components/Container'
import Layout from '@/components/Layout/Layout'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Honorarios } from '../asesorias'
import SendButton from '@/components/SendButton'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'
import { useHonorarios } from '@/api/admin/honorarios'

export default function HonorariosPage() {
  const { data: session, status } = useSession()
  const { get, post } = useHonorarios()
  const [inputs, setInputs] = useState<Honorarios>(
    get.data ?? {
      asesorias: 0,
      asesoriasControl: 0,
      suplementacion: 0,
      suplementacionControl: 0,
      domicilio: 0
    }
  )
  // TODO> alternative?
  useEffect(() => {
    if (!get.data) return
    setInputs(get.data)
  }, [get.data])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    post.mutate(inputs)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value)
    }))
  }
  return (
    <Layout>
      <Container>
        <Link href="/admin" className="absolute top-0 left-0">
          <button className="text-secondary flex items-center justify-start">
            <FaChevronLeft /> Volver
          </button>
        </Link>
        <h1 className="text-primary text-center text-3xl font-bold">
          Editar honorarios
        </h1>
        {get.isLoading || status === 'loading' ? (
          <div className="text-primary m-auto animate-pulse text-center text-2xl font-bold">
            Loading...
          </div>
        ) : (
          <>
            {session === null ? (
              <div className="m-auto text-center text-2xl font-bold text-red-500">
                Unauthorized
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-1 sm:p-2"
              >
                <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
                  <label
                    className="text-primary pl-1 font-bold"
                    htmlFor="asesorias"
                  >
                    Asesorias
                  </label>
                  <input
                    onChange={handleChange}
                    value={inputs.asesorias}
                    className="bg-secondary rounded-sm p-2 pl-5 font-semibold text-white"
                    type="number"
                    name="asesorias"
                    id="asesorias"
                  />
                </div>
                <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
                  <label
                    className="text-primary pl-1 font-bold"
                    htmlFor="asesoriasControl"
                  >
                    Control asesorias
                  </label>
                  <input
                    onChange={handleChange}
                    value={inputs.asesoriasControl}
                    className="bg-secondary rounded-sm p-2 pl-5 font-semibold text-white"
                    type="number"
                    name="asesoriasControl"
                    id="asesoriasControl"
                  />
                </div>
                <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
                  <label
                    className="text-primary pl-1 font-bold"
                    htmlFor="suplementacion"
                  >
                    Suplementacion
                  </label>
                  <input
                    onChange={handleChange}
                    value={inputs.suplementacion}
                    className="bg-secondary rounded-sm p-2 pl-5 font-semibold text-white"
                    type="number"
                    name="suplementacion"
                    id="suplementacion"
                  />
                </div>
                <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
                  <label
                    className="text-primary pl-1 font-bold"
                    htmlFor="suplementacionControl"
                  >
                    Control suplementacion
                  </label>
                  <input
                    onChange={handleChange}
                    value={inputs.suplementacionControl}
                    className="bg-secondary rounded-sm p-2 pl-5 font-semibold text-white"
                    type="number"
                    name="suplementacionControl"
                    id="suplementacionControl"
                  />
                </div>
                <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
                  <label
                    className="text-primary pl-1 font-bold"
                    htmlFor="domicilio"
                  >
                    Costo a domicilio
                  </label>
                  <input
                    onChange={handleChange}
                    value={inputs.domicilio}
                    className="bg-secondary rounded-sm p-2 pl-5 font-semibold text-white"
                    type="number"
                    name="domicilio"
                    id="domicilio"
                  />
                </div>
                <div className="m-auto my-4 flex max-w-sm justify-center">
                  <SendButton
                    sendingStatus={post.status}
                    errorMessage={post.error?.message}
                  />
                </div>
              </form>
            )}
          </>
        )}
      </Container>
    </Layout>
  )
}
