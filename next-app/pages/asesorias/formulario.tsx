import { useState } from 'react'
import Layout from '@/components/Layout/Layout'
import styles from '../../styles/MultistepForm.module.css'

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

export interface FormError {
  field: string
  message: string
}

export default function Formulario() {
  const [data, setData] = useState<FormularioData>(DEFAULT_VALUES)
  const [errors, setErrors] = useState<Map<string, string>>(new Map())

  //TODO: Show submision status
  const submit = () => {
    if (validateStep(data, Infinity)) {
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
            <Disponibilidad data={data} update={update} key="disponibilidad" />
          ]}
          submitFunction={submit}
          stepValidation={stepValidation}
        />
      </div>
    </Layout>
  )
}
