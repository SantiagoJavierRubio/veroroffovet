import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout/Layout'
import Image from 'next/image'
import styles from '../../styles/MultistepForm.module.css'
import { motion } from 'framer-motion'

import MultiStepForm from '@/components/MultiStepForm/MultiStepForm'
import Tutor from '@/components/Formulario/Tutor'
import PacienteBase from '@/components/Formulario/PacienteBase'
import PacienteCondicion from '@/components/Formulario/PacienteCondicion'
import Adjuntos from '@/components/Formulario/Adjuntos'
import Disponibilidad from '@/components/Formulario/Disponibilidad'

import type { FormularioData } from '@/components/Formulario/formularioHelpers'
import {
  DEFAULT_VALUES,
  validateStep
} from '@/components/Formulario/formularioHelpers'
import Link from 'next/link'

export interface FormError {
  field: string
  message: string
}

function sendReport(error: Error) {
  const report = {
    timestamp: new Date().toLocaleString(),
    location: '/asesorias/formulario',
    env: {
      platform: navigator.platform || 'unkown',
      userAgentData: navigator.userAgent
    },
    data: {
      message: error.message,
      stack: error.stack || 'unkown'
    }
  }
  fetch('/api/error', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(report)
  })
}

export default function Formulario({ api_uri }: { api_uri: string }) {
  const [data, setData] = useState<FormularioData>(DEFAULT_VALUES)
  const [errors, setErrors] = useState<Map<string, string>>(new Map())
  const [loader, setLoader] = useState<string>('none')

  const router = useRouter()

  /* cambiar al rehabilitar o cambiar implementacion */
  // eslint-disable-next-line prefer-const
  let habilitado = false

  const submit = () => {
    setLoader('loading')
    window.scrollTo(0, 0)
    if (validateStep(data, Infinity)) {
      fetch(api_uri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) setLoader('done')
        })
        .catch(err => {
          sendReport(err)
          alert('❌ Algo salió mal. Intentá nuevamente')
          setLoader('none')
        })
        .finally(() => {
          if (loader === 'loading') setLoader('none')
        })
    }
  }
  const update = (newData: Partial<FormularioData>) => {
    setData(d => ({ ...d, ...newData }))
  }

  const stepValidation = (index: number) => {
    setErrors(new Map())
    const status = validateStep(data, index)
    if (status.success) return true
    if (status.error) setErrors(status.error)
    return false
  }

  const handleOtherForm = () => {
    window.localStorage.setItem('nombreTutor', data.nombreTutor)
    window.localStorage.setItem('apellidoTutor', data.apellidoTutor)
    window.localStorage.setItem('mail', data.mail)
    data.celular && window.localStorage.setItem('celular', data.celular)
    window.localStorage.setItem(
      'disponibilidad',
      JSON.stringify(data.disponibilidad)
    )
    router.reload()
  }

  const handleReset = () => {
    window.localStorage.removeItem('nombreTutor')
    window.localStorage.removeItem('apellidoTutor')
    window.localStorage.removeItem('mail')
    data.celular && window.localStorage.removeItem('celular')
    window.localStorage.removeItem('disponibilidad')
  }

  useEffect(() => {
    const storage = {
      nombreTutor: window.localStorage.getItem('nombreTutor'),
      apellidoTutor: window.localStorage.getItem('apellidoTutor'),
      mail: window.localStorage.getItem('mail'),
      celular: window.localStorage.getItem('celular'),
      disponibilidad: window.localStorage.getItem('disponibilidad')
    }
    setData({
      ...DEFAULT_VALUES,
      nombreTutor: storage.nombreTutor || DEFAULT_VALUES.nombreTutor,
      apellidoTutor: storage.apellidoTutor || DEFAULT_VALUES.apellidoTutor,
      mail: storage.mail || DEFAULT_VALUES.mail,
      celular: storage.celular || DEFAULT_VALUES.celular,
      disponibilidad: storage.disponibilidad
        ? JSON.parse(storage.disponibilidad)
        : DEFAULT_VALUES.disponibilidad
    })
  }, [])

  return (
    <Layout title="Asesorias nutricionales - Formulario">
      <h2>No disponible</h2>
    </Layout>
  )
  return (
    <Layout title="Asesorias nutricionales - Formulario">
      <div
        className={`${
          loader !== 'none' ? 'flex' : 'hidden'
        } h-96 w-full items-center justify-center`}
      >
        {loader === 'loading' ? (
          <div className="animate-pulse">
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: 180 }}
              transition={{
                repeat: Infinity,
                repeatDelay: 0.1,
                duration: 0.65,
                repeatType: 'mirror'
              }}
            >
              <Image
                src="/svgs/cat.svg"
                width={100}
                height={100}
                alt="loader"
              />
            </motion.div>
            <p className="text-primary mt-4 text-2xl">Enviando</p>
          </div>
        ) : (
          <div className="text-primary text-center text-xl">
            <h4 className="text-3xl font-bold">Listo 🥳</h4>
            <p className="text-base italic">
              Tu solicitud fue enviada correctamente
            </p>
            <p className="m-12 italic">
              A la brevedad te estaré escribiendo para poder avanzar
            </p>
            <div className="m-8">
              <Link
                href="/"
                className="hover:text-secondary text-primary"
                onClick={handleReset}
              >
                {'<'} Volver al incio
              </Link>
            </div>
            <p>o</p>
            <div
              className="bg-primary hover:text-secondary m-auto mt-8 w-fit cursor-pointer rounded-lg p-4 text-stone-200 hover:shadow-xl"
              onClick={handleOtherForm}
            >
              Llenar otro formulario {'>'}
            </div>
          </div>
        )}
      </div>
      <div className={`${loader === 'none' ? 'block' : 'hidden'}`}>
        <h1 className="text-secondary my-4 text-center text-4xl font-bold">
          Solicitar asesoría nutricional
        </h1>
        {habilitado ? (
          <h2 className="mt-12 text-center text-2xl text-red-400">
            Momentaneamente no disponible
          </h2>
        ) : (
          <div className={styles.form}>
            <MultiStepForm
              pages={[
                <Tutor
                  data={data}
                  update={update}
                  key="tutor"
                  errors={errors}
                />,
                <PacienteBase
                  data={data}
                  update={update}
                  key="pacienteBase"
                  errors={errors}
                />,
                <PacienteCondicion
                  data={data}
                  update={update}
                  key="pacienteCondicion"
                  errors={errors}
                />,
                <Adjuntos
                  update={update}
                  data={data}
                  key="adjuntos"
                  errors={errors}
                />,
                <Disponibilidad
                  data={data}
                  update={update}
                  key="disponibilidad"
                />
              ]}
              submitFunction={submit}
              stepValidation={stepValidation}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: {
      api_uri: `${process.env.EMAIL_SERVER}/asesoria`
    }
  }
}
