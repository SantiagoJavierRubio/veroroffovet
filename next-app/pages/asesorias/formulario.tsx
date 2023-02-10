import { useState } from 'react'
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

export default function Formulario() {
  const [data, setData] = useState<FormularioData>(DEFAULT_VALUES)
  const [errors, setErrors] = useState<Map<string, string>>(new Map())
  const [loader, setLoader] = useState<string>('none')

  const submit = () => {
    setLoader('loading')
    if (validateStep(data, Infinity)) {
      fetch('/api/contact', {
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
          alert(err)
          setLoader('none')
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
            <p>Tu solicitud fue enviada correctamente</p>
            <p className="mt-8 italic">
              A la brevedad te estare escribiendo para poder avanzar
            </p>
            <div className="mt-8">
              <Link href="/" className="hover:text-secondary underline">
                Volver al incio
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className={`${loader === 'none' ? 'block' : 'hidden'}`}>
        <h1 className="text-secondary my-4 text-center text-4xl font-bold">
          Solicitar asesoria nutricional
        </h1>
        <div className={styles.form}>
          <MultiStepForm
            pages={[
              <Tutor data={data} update={update} key="tutor" errors={errors} />,
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
      </div>
    </Layout>
  )
}
