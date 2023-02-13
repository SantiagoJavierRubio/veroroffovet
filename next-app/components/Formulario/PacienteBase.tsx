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
  errors: Map<string, string>
}

export default function PacienteBase(props: PacienteBaseProps) {
  const { data, update, errors } = props
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    update({ [e.target.id]: e.target.value })
  }
  const handleCheckboxToggle = (e: ChangeEvent<HTMLInputElement>) => {
    update({ castrado: e.target.id === 'true' })
  }
  const renderError = (fieldName: string) => (
    <p className="px-2 text-right text-sm font-normal italic text-red-500">
      {errors.has(fieldName) && '* ' + errors.get(fieldName)}
    </p>
  )
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
          autoFocus={!data.nombrePaciente}
        />
        {renderError('nombrePaciente')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="especie">Especie</label>
        <select
          id="especie"
          value={data.especie}
          onChange={handleChange}
          className="capitalize"
          required
        >
          <option value={ESPECIES.GATO} className="capitalize">
            {ESPECIES.GATO}
          </option>
          <option value={ESPECIES.PERRO} className="capitalize">
            {ESPECIES.PERRO}
          </option>
        </select>
        {renderError('expecie')}
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
        {renderError('raza')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="sexo">Sexo</label>
        <select id="sexo" value={data.sexo} onChange={handleChange} required>
          <option value={SEXOS.MACHO}>Macho</option>
          <option value={SEXOS.HEMBRA}>Hembra</option>
        </select>
        {renderError('sexo')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="castrado">
          ¿Está castrad{data.sexo === SEXOS.MACHO ? 'o' : 'a'}?
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
              className="invisible relative after:content-{''}
              after:rounded-full after:border-2 after:absolute after:top-0 after:left-0
              after:w-3 after:h-3 after:visible after:border-black after:cursor-pointer
              after:p-1 checked:after:bg-secondary after:bg-contain after:bg-transparent"
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
              className="invisible relative after:content-{''}
              after:rounded-full after:border-2 after:absolute after:top-0 after:left-0
              after:w-3 after:h-3 after:visible after:border-black after:cursor-pointer
              after:p-1 checked:after:bg-secondary after:bg-contain after:bg-transparent"
            />
          </div>
        </div>
        {renderError('castrado')}
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
        {renderError('edad')}
      </div>
    </FormStep>
  )
}
