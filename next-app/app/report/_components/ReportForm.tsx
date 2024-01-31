'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import useSendingStatus from '@/app/_hooks/useSendingStatus'
import SendButton from '@/components/SendButton'

export function ReportForm() {
  const [input, setInput] = useState('')
  const { sendingStatus, setSendingStatus, SENDING_STATUS } = useSendingStatus()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }
  const handleSubmit = (e: FormEvent) => {
    setSendingStatus(SENDING_STATUS.SENDING)
    e.preventDefault()
    fetch('/api/report', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ report: input })
    })
      .then(res => {
        if (res.ok) setSendingStatus(SENDING_STATUS.RESPONSE_OK)
        setInput('')
      })
      .catch(err => {
        console.log(err)
        setSendingStatus(SENDING_STATUS.ERROR)
      })
      .finally(() => {
        setTimeout(() => setSendingStatus(SENDING_STATUS.NULL), 5000)
      })
  }
  return (
    <>
      <form
        className="flex flex-col items-center justify-center gap-2 p-6"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="report"
          className="text-primary text-center text-lg font-semibold"
        >
          Por favor indicar cuál es el problema
        </label>
        <p className="text-secondary text-center text-base font-normal italic">
          Especificar lo más detalladamente posible en qué página sucedió, qué
          elemento fue el que no funcionó correctamente o qué esperabas que
          hiciera
        </p>
        <textarea
          className="bg-secondary min-h-[10rem] w-full grow rounded-md p-2 font-bold text-white"
          name="report"
          id="report"
          autoFocus
          value={input}
          onChange={handleChange}
          required
        />
        <SendButton sendingStatus={sendingStatus} />
      </form>
      {sendingStatus === SENDING_STATUS.RESPONSE_OK && (
        <p className="text-primary text-center text-xl font-semibold">
          En breve estaremos solucionando tu inquietud ¡Gracias!
        </p>
      )}
    </>
  )
}
