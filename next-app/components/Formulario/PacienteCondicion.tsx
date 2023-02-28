import { ChangeEvent, useState } from 'react'
import FormStep from '../MultiStepForm/FormStep'
import { FormularioData, COSTILLAS_TEXT } from './formularioHelpers'
import CondicionImageSelect from './CondicionImageSelect'
import styles from '../../styles/MultistepForm.module.css'
import useLocalInputs from '@/hooks/useLocalInputs'

interface PacienteCondicionData {
  peso: FormularioData['peso']
  otrosAnimales: FormularioData['otrosAnimales']
  dietaActual: FormularioData['dietaActual']
  actividad: FormularioData['actividad']
  antecedentes: FormularioData['antecedentes']
  graficoPeso: FormularioData['graficoPeso']
  costillas: FormularioData['costillas']
  especie: FormularioData['especie']
  sexo: FormularioData['sexo']
}

interface PacienteCondicionProps {
  data: PacienteCondicionData
  update: (newData: Partial<PacienteCondicionData>) => void
  errors: Map<string, string>
}

export default function PacienteCondicion(props: PacienteCondicionProps) {
  const { data, update, errors } = props
  const { inputs, updateInputs } = useLocalInputs<PacienteCondicionData>(data)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (e.target.type === 'number') {
      if (isNaN(parseFloat(e.target.value))) {
        updateInputs(e.target.id as keyof PacienteCondicionData, 0)
        update({ [e.target.id]: 0 })
      } else {
        updateInputs(
          e.target.id as keyof PacienteCondicionData,
          parseFloat(e.target.value)
        )
        update({ [e.target.id]: parseFloat(e.target.value) })
      }
    } else {
      updateInputs(e.target.id as keyof PacienteCondicionData, e.target.value)
      update({ [e.target.id]: e.target.value })
    }
  }
  const renderError = (fieldName: string) => (
    <p className="px-2 text-right text-sm font-normal italic text-red-500">
      {errors.has(fieldName) && '* ' + errors.get(fieldName)}
    </p>
  )

  const setCostillasCheck = (index: number) => {
    updateInputs('costillas', index)
    update({ costillas: index })
  }
  return (
    <FormStep title="Condicion del paciente">
      <div className={styles.labeledInput}>
        <label htmlFor="peso">Peso</label>
        <div className="flex">
          <input
            type="number"
            id="peso"
            step="0.1"
            min="0"
            value={inputs.peso || ''}
            onChange={handleChange}
            required
            autoFocus={!inputs.peso}
            className="grow basis-5/6"
          />
          <span className="mt-2 ml-1 font-bold">Kg</span>
        </div>
        <p className="ml-2 mt-2 font-normal italic">
          * Para pesarlo en casa con balanza de piso: pesarse con el animal
          alzado, luego sin él y hacer la resta. Por ejemplo:
          <br />
          <span className="ml-2">
            {'-'} Humano + animal = 70kg; humano = 60kg; <br />
          </span>
          <span className="ml-2">
            {'-'} Peso del animal ={'>'} 70kg - 60kg = 10Kg
          </span>
        </p>
        {renderError('peso')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="otrosAnimales">
          ¿Convive con otros animales?{' '}
          <span className={styles.aclaracion}>(especificar)</span>
        </label>
        <textarea
          id="otrosAnimales"
          value={inputs.otrosAnimales}
          onChange={handleChange}
        />
        {renderError('otrosAnimales')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="dietaActual">
          ¿Qué come actualmente?{' '}
          <span className={styles.aclaracion}>
            (si es un ultraprocesado/balanceado indicar marca y tipo)
          </span>
        </label>
        <textarea
          id="dietaActual"
          value={inputs.dietaActual}
          required
          onChange={handleChange}
        />
        {renderError('dietaActual')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="actividad">
          Nivel de actividad{' '}
          <span className={styles.aclaracion}>
            (indicar si sale a pasear, cuánto tiempo y frecuencia, si juega en
            casa, etc)
          </span>
        </label>
        <textarea
          id="actividad"
          value={inputs.actividad}
          required
          onChange={handleChange}
        />
        {renderError('actividad')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="antecedentes">
          Antecedentes de alguna patología o algo que creas importante contarme
        </label>
        <textarea
          id="antecedentes"
          value={inputs.antecedentes}
          onChange={handleChange}
        />
        {renderError('antecedentes')}
      </div>
      <CondicionImageSelect
        graficoPeso={data.graficoPeso}
        especie={inputs.especie}
        sexo={inputs.sexo}
        update={update}
      />
      <div className="mr-[20%]">{renderError('graficoPeso')}</div>
      <div className={styles.labeledInput}>
        <label htmlFor="costillas">Palpación de costillas</label>
        <p className={styles.aclaracion}>
          Tocale la zona de las costillas con la yema de los dedos e intentá
          contar las costillas ejerciendo una leve presión: deberías sentir una
          parte dura (el hueso) y una depresión más blanda que corresponde al
          espacio intercostal compuesto por músculo ¿Que opción describe mejor
          tu experiencia?
        </p>
        <div className="mt-4 flex flex-col items-start justify-evenly gap-4 pl-4">
          {COSTILLAS_TEXT.map((opt, index) => (
            <div key={index}>
              <input
                type="radio"
                name="costillas"
                checked={inputs.costillas === index}
                onChange={() => setCostillasCheck(index)}
                value={index}
                className="invisible relative mr-2 after:content-{''}
                after:rounded-full after:border-2 after:absolute after:top-0 after:left-0
                after:w-3 after:h-3 after:visible after:border-black after:cursor-pointer
                after:p-1 checked:after:bg-secondary after:bg-contain after:bg-transparent"
              />
              <label
                className={`cursor-pointer ${
                  inputs.costillas === index && 'font-extrabold'
                }`}
                onClick={() => setCostillasCheck(index)}
              >
                {opt}
              </label>
              {renderError('costillas')}
            </div>
          ))}
        </div>
      </div>
    </FormStep>
  )
}
