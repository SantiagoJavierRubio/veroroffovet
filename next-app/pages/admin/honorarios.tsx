import Container from '@/components/Container'
import Layout from '@/components/Layout/Layout'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useSession } from 'next-auth/react'
import { Honorarios } from '../asesorias'
import SendButton from '@/components/SendButton'
import useSendingStatus from '@/hooks/useSendingStatus'
import { PrismaClient } from '@prisma/client'
import { Price } from '.prisma/client'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'

function parsePriceListToObject(prices: Price[]) {
  return Object.fromEntries(
    prices.map(p => {
      return [p.title, p.value]
    })
  )
}

interface HonorariosProps {
  honorarios: Honorarios | null
}

export default function HonorariosPage({ honorarios }: HonorariosProps) {
  const { data: session, status } = useSession()
  const [inputs, setInputs] = useState<Honorarios>(
    () =>
      honorarios || {
        asesorias: 0,
        asesoriasControl: 0,
        suplementacion: 0,
        suplementacionControl: 0,
        domicilio: 0
      }
  )
  const { sendingStatus, setSendingStatus, SENDING_STATUS } = useSendingStatus()
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSendingStatus(SENDING_STATUS.SENDING)
    const upates = Object.entries(inputs).filter(([, val]) => val > 0)

    fetch('/api/admin/update_price', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(upates)
    })
      .then(res => {
        if (res.status === 200) {
          setSendingStatus(SENDING_STATUS.RESPONSE_OK)
        }
        return res.json()
      })
      .then(data => {
        setInputs(parsePriceListToObject(data))
        setTimeout(() => setSendingStatus(SENDING_STATUS.NULL), 1500)
      })
      .catch(err => {
        err instanceof Error && setErrorMsg(err.message)
        setSendingStatus(SENDING_STATUS.ERROR)
      })
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
        {status === 'loading' ? (
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
                    sendingStatus={sendingStatus}
                    errorMessage={errorMsg}
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

export async function getServerSideProps() {
  const prisma = new PrismaClient()
  try {
    const prices = (await prisma.price.findMany({
      select: { title: true, value: true }
    })) as Price[]
    return {
      props: {
        honorarios: parsePriceListToObject(prices)
      }
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        honorarios: null
      }
    }
  } finally {
    prisma.$disconnect()
  }
}
