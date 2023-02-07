import { ChangeEvent } from 'react'
import FormStep from '../MultiStepForm/FormStep'
import type { FormularioData } from './formularioHelpers'
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
}

export default function Tutor(props: TutorProps) {
  const { data, update } = props
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    update({ [e.target.id]: e.target.value })
  }
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
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="dietaElegida">Dieta elegida</label>
        <select
          id="dietaElegida"
          value={data.dietaElegida}
          required
          onChange={handleChange}
        >
          <option value="barf">BARF</option>
          <option value="cocida">Natural cocida</option>
          <option value="mixta">Mixta</option>
          <option value="suplementada">
            Suplementacion de ultraprocesados
          </option>
        </select>
      </div>
    </FormStep>
  )
}
