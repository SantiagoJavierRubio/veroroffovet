import { ChangeEvent } from 'react'
import FormStep from '../MultiStepForm/FormStep'
import { FormularioData, ESPECIES, SEXOS } from './formularioHelpers'
import styles from '../../styles/MultistepForm.module.css'

interface PacienteBaseData {
  nombrePaciente: FormularioData['nombrePaciente']
  especie: FormularioData['especie']
  raza: FormularioData['raza']
  sexo: FormularioData['sexo']
  castrado: FormularioData['castrado']
  edad: FormularioData['edad']
}

interface PacienteBaseProps {
  data: PacienteBaseData
  update: (newData: Partial<PacienteBaseData>) => void
}

export default function PacienteBase(props: PacienteBaseProps) {
  const { data, update } = props
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    update({ [e.target.id]: e.target.value })
  }
  const handleCheckboxToggle = (e: ChangeEvent<HTMLInputElement>) => {
    update({ castrado: e.target.id === 'true' })
  }
  return (
    <FormStep title="Datos del paciente">
      <div className={styles.labeledInput}>
        <label htmlFor="nombrePaciente">Nombre</label>
        <input
          type="text"
          id="nombrePaciente"
          value={data.nombrePaciente}
          onChange={handleChange}
          required
          autoFocus
        />
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="especie">Especie</label>
        <select
          id="especie"
          value={data.especie}
          onChange={handleChange}
          required
        >
          <option value={ESPECIES.GATO}>{ESPECIES.GATO}</option>
          <option value={ESPECIES.PERRO}>{ESPECIES.PERRO}</option>
        </select>
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="raza">Raza</label>
        <input
          type="text"
          id="raza"
          value={data.raza}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="sexo">Sexo</label>
        <select id="sexo" value={data.sexo} onChange={handleChange} required>
          <option value={SEXOS.MACHO}>Macho</option>
          <option value={SEXOS.HEMBRA}>Hembra</option>
        </select>
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="castrado">
          Esta castrad{data.sexo === SEXOS.MACHO ? 'o' : 'a'}?
        </label>
        <div className="flex justify-around">
          <div className={styles.radioOption}>
            <label>Si</label>
            <input
              type="radio"
              name="castrado"
              id="true"
              onChange={handleCheckboxToggle}
              checked={data.castrado}
            />
          </div>
          <div className={styles.radioOption}>
            <label>No</label>
            <input
              type="radio"
              name="castrado"
              id="false"
              onChange={handleCheckboxToggle}
              checked={!data.castrado}
            />
          </div>
        </div>
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="edad">Edad</label>
        <input
          type="text"
          id="edad"
          value={data.edad}
          onChange={handleChange}
          required
        />
      </div>
    </FormStep>
  )
}
