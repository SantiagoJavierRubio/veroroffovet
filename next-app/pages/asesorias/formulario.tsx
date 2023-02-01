import { useState } from 'react'
import Layout from '@/components/Layout/Layout'
import styles from '../../styles/MultistepForm.module.css'

import MultiStepForm from '@/components/MultiStepForm/MultiStepForm'
import Tutor from '@/components/Formulario/Tutor'
import PacienteBase from '@/components/Formulario/PacienteBase'
import PacienteCondicion from '@/components/Formulario/PacienteCondicion'
import Adjuntos from '@/components/Formulario/Adjuntos'

import type { FormularioData } from '@/components/Formulario/formularioHelpers'
import { DEFAULT_VALUES } from '@/components/Formulario/formularioHelpers'

export default function Formulario() {
  const [data, setData] = useState<FormularioData>(DEFAULT_VALUES)

  const submit = () => {
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
  const update = (newData: Partial<FormularioData>) => {
    setData(d => ({ ...d, ...newData }))
  }

  return (
    <Layout title="Asesorias nutricionales - Formulario">
      <h1 className="text-primary my-4 text-center text-4xl font-bold">
        Solicitar asesoria nutricional
      </h1>
      <div className={styles.form}>
        <MultiStepForm
          pages={[
            <Tutor data={data} update={update} key="tutor" />,
            <PacienteBase data={data} update={update} key="pacienteBase" />,
            <PacienteCondicion
              data={data}
              update={update}
              key="pacienteCondicion"
            />,
            <Adjuntos update={update} key="adjuntos" />
          ]}
          submitFunction={submit}
        />
      </div>
    </Layout>
  )
}
