import { useState } from "react"
import Layout from "@/components/Layout/Layout"
import styles from "../../styles/MultistepForm.module.css"

import MultiStepForm from "@/components/MultiStepForm/MultiStepForm"
import Tutor from "@/components/Formulario/Tutor"
import PacienteBase from "@/components/Formulario/PacienteBase"
import PacienteCondicion from "@/components/Formulario/PacienteCondicion"
import Adjuntos from "@/components/Formulario/Adjuntos"

import type { FormularioData } from "@/components/Formulario/formularioHelpers"
import { DEFAULT_VALUES } from "@/components/Formulario/formularioHelpers"

export default function Formulario() {
  const [data, setData] = useState<FormularioData>(DEFAULT_VALUES)

  const submit = () => {
    console.log(data)
  }
  const update = (newData: Partial<FormularioData>) => {
    setData(d => ({...d, ...newData}))
  }

  return (
    <Layout title="Asesorias nutricionales - Formulario">
        <h1 className="text-center my-4 text-primary font-bold text-4xl">Solicitar asesoria nutricional</h1>
        <div className={styles.form}>
          <MultiStepForm 
            pages={[
              <Tutor data={data} update={update} />,
              <PacienteBase data={data} update={update} />,
              <PacienteCondicion data={data} update={update} />,
              <Adjuntos data={data} update={update} />
            ]}
            submitFunction={submit}
          />
        </div>
    </Layout>
  )
}
