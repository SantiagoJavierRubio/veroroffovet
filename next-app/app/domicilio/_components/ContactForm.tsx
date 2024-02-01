'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'
import useSendingStatus from '@/app/_hooks/useSendingStatus'
import SendButton from '@/app/_components/common/SendButton'

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

export function ContactForm() {
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
