import { ChangeEvent } from 'react'
import FormStep from '../MultiStepForm/FormStep'
import { FormularioData, DIET_TYPES } from './formularioHelpers'
import styles from '../../styles/MultistepForm.module.css'

interface TutorData {
  nombreTutor: FormularioData['nombreTutor']
  apellidoTutor: FormularioData['apellidoTutor']
  mail: FormularioData['mail']
  celular: FormularioData['celular']
  dietaElegida: FormularioData['dietaElegida']
}

interface TutorProps {
  data: TutorData
  update: (newData: Partial<TutorData>) => void
  errors: Map<string, string>
}

export default function Tutor(props: TutorProps) {
  const { data, update, errors } = props
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    update({ [e.target.id]: e.target.value })
  }
  const renderError = (fieldName: string) => (
    <p className="px-2 text-right text-sm font-normal italic text-red-500">
      {errors.has(fieldName) && '* ' + errors.get(fieldName)}
    </p>
  )
  return (
    <FormStep title="Datos del tutor">
      <div className={styles.labeledInput}>
        <label htmlFor="nombreTutor">Nombre</label>
        <input
          type="text"
          id="nombreTutor"
          value={data.nombreTutor}
          required
          autoFocus
          onChange={handleChange}
        />
        {renderError('nombreTutor')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="apellidoTutor">Apellido</label>
        <input
          type="text"
          id="apellidoTutor"
          value={data.apellidoTutor}
          required
          onChange={handleChange}
        />
        {renderError('apellidoTutor')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="mail">Mail</label>
        <input
          type="email"
          id="mail"
          value={data.mail}
          required
          onChange={handleChange}
        />
        {renderError('mail')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="celular">
          Celular <span className="font-normal italic">(opcional)</span>
        </label>
        <input
          type="tel"
          id="celular"
          value={data.celular}
          onChange={handleChange}
        />
        {renderError('celular')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="dietaElegida">Dieta elegida</label>
        <select
          id="dietaElegida"
          value={data.dietaElegida}
          required
          onChange={handleChange}
        >
          {Object.entries(DIET_TYPES).map(([key, diet]) => (
            <option key={key} value={diet}>
              {diet}
            </option>
          ))}
        </select>
        {renderError('dietaElegida')}
      </div>
    </FormStep>
  )
}
