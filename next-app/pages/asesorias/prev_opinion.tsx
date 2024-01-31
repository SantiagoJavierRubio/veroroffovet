import React from 'react'
import Layout from '@/components/Layout/Layout'
import Container from '@/components/Container'
import { useState, ChangeEvent, FormEvent } from 'react'
import useSendingStatus from '@/app/_hooks/useSendingStatus'
import SendButton from '@/components/SendButton'

const CONFORMITY_VALS = {
  SI: 'Si',
  NO: 'No',
  NI: 'En algunos aspectos si, en otros no'
}

const RECOMMEND_VALS = {
  SI: 'Si',
  NO: 'No',
  NI: 'Tal vez'
}

const DEFAULT_VALUES = {
  nombreTutor: '',
  nombrePaciente: '',
  conforme: '',
  cambios: '',
  recomendacion: '',
  testimonio: ''
}

export default function Opinion() {
  const [inputs, setInputs] = useState<typeof DEFAULT_VALUES>(DEFAULT_VALUES)

  const { sendingStatus, SENDING_STATUS, setSendingStatus } = useSendingStatus()
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (errorMsg !== undefined) setErrorMsg(undefined)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSendingStatus(SENDING_STATUS.SENDING)
    if (!inputs.conforme || !inputs.recomendacion) {
      setErrorMsg('Campos requeridos faltantes')
      setSendingStatus(SENDING_STATUS.ERROR)
      setTimeout(() => setSendingStatus(SENDING_STATUS.NULL), 2000)
    } else
      fetch('/api/opinion', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      })
        .then(res => {
          if (res.status === 200) {
            setSendingStatus(SENDING_STATUS.RESPONSE_OK)
            setInputs(DEFAULT_VALUES)
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
  return (
    <Layout title="Encuesta sobre tu experiencia">
      <Container>
        <h1 className="text-primary mb-0 text-center text-2xl font-bold sm:text-4xl">
          Encuesta sobre tu experiencia con la asesoría
        </h1>
        <h2 className="text-primary mb-0 text-center text-xl font-semibold sm:text-3xl">
          Me interesa conocer tu opinión
        </h2>
        <h3 className="text-secondary mb-0 text-center text-lg font-normal sm:text-xl">
          ¡Gracias por ayudarme a mejorar!
        </h3>
        <form
          onSubmit={handleSubmit}
          className="border-primary m-auto mt-4 flex w-full max-w-full flex-col gap-2 rounded-md border-0 p-2 sm:w-4/5 sm:border-2 sm:p-6"
        >
          <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-4/5 lg:w-3/5">
            <label htmlFor="nombreTutor" className="text-primary font-bold">
              Nombre y apellido{' '}
              <span className="font-normal italic">(opcional)</span>
            </label>
            <input
              type="text"
              value={inputs.nombreTutor}
              name="nombreTutor"
              id="nombreTutor"
              onChange={handleChange}
              className="bg-secondary rounded-sm p-2 text-white"
            />
          </div>
          <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-4/5 lg:w-3/5">
            <label htmlFor="nombrePaciente" className="text-primary font-bold">
              Nombre del perro/gato{' '}
              <span className="font-normal italic">(opcional)</span>
            </label>
            <input
              type="text"
              value={inputs.nombrePaciente}
              name="nombrePaciente"
              id="nombrePaciente"
              onChange={handleChange}
              className="bg-secondary rounded-sm p-2 text-white"
            />
          </div>
          <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-4/5 lg:w-3/5">
            <label htmlFor="conforme" className="text-primary font-bold">
              ¿Estás conforme con el servicio prestado?
            </label>
            <div className="flex items-center justify-evenly gap-2 py-2">
              <label
                htmlFor="conforme-si"
                className={`cursor-pointer rounded-md bg-gray-200 p-4 font-bold ${
                  inputs.conforme === CONFORMITY_VALS.SI
                    ? 'text-primary border-secondary border-2'
                    : 'text-primary/50'
                }`}
              >
                {CONFORMITY_VALS.SI}
                <input
                  type="radio"
                  name="conforme"
                  value={CONFORMITY_VALS.SI}
                  checked={inputs.conforme === CONFORMITY_VALS.SI}
                  id="conforme-si"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              <label
                htmlFor="conforme-no"
                className={`cursor-pointer rounded-md bg-gray-200 p-4 font-bold ${
                  inputs.conforme === CONFORMITY_VALS.NO
                    ? 'text-primary border-secondary border-2'
                    : 'text-primary/50'
                }`}
              >
                {CONFORMITY_VALS.NO}
                <input
                  type="radio"
                  name="conforme"
                  value={CONFORMITY_VALS.NO}
                  checked={inputs.conforme === CONFORMITY_VALS.NO}
                  id="conforme-no"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              <label
                htmlFor="conforme-ni"
                className={`cursor-pointer rounded-md bg-gray-200 p-4 font-bold ${
                  inputs.conforme === CONFORMITY_VALS.NI
                    ? 'text-primary border-secondary border-2'
                    : 'text-primary/50'
                }`}
              >
                {CONFORMITY_VALS.NI}
                <input
                  type="radio"
                  name="conforme"
                  value={CONFORMITY_VALS.NI}
                  checked={inputs.conforme === CONFORMITY_VALS.NI}
                  id="conforme-ni"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
            {errorMsg && !inputs.conforme && (
              <p className="text-right text-base text-red-500">
                * Selecciona una opción
              </p>
            )}
          </div>
          <div
            className={`m-auto my-2 grid w-full max-w-full origin-top auto-cols-auto transition-all duration-200 sm:w-3/5 ${
              inputs.conforme === CONFORMITY_VALS.NO ||
              inputs.conforme === CONFORMITY_VALS.NI
                ? 'scale-y-100 opacity-100'
                : 'opcaity-0 h-0 scale-y-0'
            }`}
          >
            <label htmlFor="cambios" className="text-primary font-bold">
              ¿Qué cambiarías?
            </label>
            <textarea
              id="cambios"
              name="cambios"
              value={inputs.cambios}
              onChange={handleChange}
              className="bg-secondary min-h-[6rem] rounded-sm p-2 text-white"
              disabled={inputs.conforme === CONFORMITY_VALS.SI}
              required={
                inputs.conforme === CONFORMITY_VALS.NO ||
                inputs.conforme === CONFORMITY_VALS.NI
              }
            />
          </div>
          <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-4/5 lg:w-3/5">
            <label htmlFor="recomendacion" className="text-primary font-bold">
              ¿Me recomendarías con otros/as tutores/as?
            </label>
            <div className="flex items-center justify-evenly gap-2 py-2">
              <label
                htmlFor="recomendacion-si"
                className={`cursor-pointer rounded-md bg-gray-200 p-4 font-bold ${
                  inputs.recomendacion === RECOMMEND_VALS.SI
                    ? 'text-primary border-secondary border-2'
                    : 'text-primary/50'
                }`}
              >
                {RECOMMEND_VALS.SI}
                <input
                  type="radio"
                  name="recomendacion"
                  value={RECOMMEND_VALS.SI}
                  checked={inputs.recomendacion === RECOMMEND_VALS.SI}
                  id="recomendacion-si"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              <label
                htmlFor="recomendacion-no"
                className={`cursor-pointer rounded-md bg-gray-200 p-4 font-bold ${
                  inputs.recomendacion === RECOMMEND_VALS.NO
                    ? 'text-primary border-secondary border-2'
                    : 'text-primary/50'
                }`}
              >
                {RECOMMEND_VALS.NO}
                <input
                  type="radio"
                  name="recomendacion"
                  value={RECOMMEND_VALS.NO}
                  checked={inputs.recomendacion === RECOMMEND_VALS.NO}
                  id="recomendacion-no"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              <label
                htmlFor="recomendacion-ni"
                className={`cursor-pointer rounded-md bg-gray-200 p-4 font-bold ${
                  inputs.recomendacion === RECOMMEND_VALS.NI
                    ? 'text-primary border-secondary border-2'
                    : 'text-primary/50'
                }`}
              >
                {RECOMMEND_VALS.NI}
                <input
                  type="radio"
                  name="recomendacion"
                  value={RECOMMEND_VALS.NI}
                  checked={inputs.recomendacion === RECOMMEND_VALS.NI}
                  id="recomendacion-ni"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
            {errorMsg && !inputs.recomendacion && (
              <p className="text-right text-base text-red-500">
                * Selecciona una opción
              </p>
            )}
          </div>
          <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-4/5 lg:w-3/5">
            <label htmlFor="testimonio" className="text-primary font-bold">
              ¿Querés contar tu experiencia para que sea compartida con otros/as
              tutores/as?
            </label>
            <p className="text-primary py-2 text-center font-normal">
              ¡Te lo agradezco un montón!
            </p>
            <textarea
              name="testimonio"
              value={inputs.testimonio}
              onChange={handleChange}
              id="testimonio"
              className="bg-secondary min-h-[6rem] rounded-sm p-2 text-white"
            />
          </div>
          <div className="m-auto my-4 flex max-w-sm justify-center">
            <SendButton sendingStatus={sendingStatus} />
          </div>
        </form>
      </Container>
    </Layout>
  )
}
