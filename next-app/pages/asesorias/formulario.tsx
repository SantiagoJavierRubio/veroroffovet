import { useState } from "react"
import Layout from "@/components/Layout/Layout"

import MultiStepForm from "@/components/MultiStepForm/MultiStepForm"
import Tutor from "@/components/Formulario/Tutor"
import PacienteBase from "@/components/Formulario/PacienteBase"
import PacienteCondicion from "@/components/Formulario/PacienteCondicion"

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
        <h1>Solicitar asesoria nutricional</h1>
        <MultiStepForm 
          pages={[
            <Tutor data={data} update={update} />,
            <PacienteBase data={data} update={update} />,
            <PacienteCondicion data={data} update={update} />,
          ]}
          submitFunction={submit}
        />
    </Layout>
  )
}
