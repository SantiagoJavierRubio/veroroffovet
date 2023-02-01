import { ChangeEvent } from 'react'
import FormStep from '../MultiStepForm/FormStep'
import { FormularioData, COSTILLAS_TEXT } from './formularioHelpers'
import CondicionImageSelect from './CondicionImageSelect'
import styles from '../../styles/MultistepForm.module.css'

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
}

export default function PacienteCondicion(props: PacienteCondicionProps) {
  const { data, update } = props
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (e.target.type === 'number') {
      update({ [e.target.id]: parseFloat(e.target.value) })
    } else update({ [e.target.id]: e.target.value })
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
            value={data.peso}
            onChange={handleChange}
            required
            autoFocus
            className="grow basis-5/6"
          />
          <span className="mt-2 ml-1 font-bold">Kg</span>
        </div>
        <p className="ml-4 text-base italic">
          * Para pesarlo en casa con balanza de piso: pesarse con el animal
          alzado, luego sin el y hacer la resta.
          <br />
          Por ejemplo: humano + animal = 70kg; humano = 60kg; Peso del animal =
          {'>'} 70kg - 60kg = 10Kg
        </p>
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="otrosAnimales">
          Convive con otros animales?{' '}
          <span className={styles.aclaracion}>(especificar)</span>
        </label>
        <textarea
          id="otrosAnimales"
          value={data.otrosAnimales}
          onChange={handleChange}
        />
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="dietaActual">
          Que come actualmente?{' '}
          <span className={styles.aclaracion}>
            (si es un ultraprocesado/balanceado indicar marca y tipo)
          </span>
        </label>
        <textarea
          id="dietaActual"
          value={data.dietaActual}
          required
          onChange={handleChange}
        />
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="actividad">
          Nivel de actividad{' '}
          <span className={styles.aclaracion}>
            (indicar si sale a pasear, cuanto tiempo y frecuencia, si juega en
            casa, etc)
          </span>
        </label>
        <textarea
          id="actividad"
          value={data.actividad}
          required
          onChange={handleChange}
        />
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="antecedentes">
          Antecedentes de alguna patologia o algo que creas importante contarme
        </label>
        <textarea
          id="antecedentes"
          value={data.antecedentes}
          onChange={handleChange}
        />
      </div>
      <CondicionImageSelect
        graficoPeso={data.graficoPeso}
        especie={data.especie}
        sexo={data.sexo}
        update={update}
      />
      <div className={styles.labeledInput}>
        <label htmlFor="costillas">Cuenta de costillas</label>
        <p className={styles.aclaracion}>
          Tocale la zona de las costillas con la yema de los dedos e intenta
          contar las costillas ejerciendo una leve presion: deberias sentir una
          parte dura (el hueso) y una depresion mas blanda que corresponde al
          espacio intercostal compuesto por musculo. Que opcion describe mejor
          tu experiencia?
        </p>
        <select id="costillas" value={data.costillas} onChange={handleChange}>
          {COSTILLAS_TEXT.map((opt, index) => (
            <option key={index} value={index}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </FormStep>
  )
}
