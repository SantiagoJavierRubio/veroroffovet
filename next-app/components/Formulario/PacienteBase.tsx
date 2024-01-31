import { ChangeEvent } from 'react'
import FormStep from '../MultiStepForm/FormStep'
import { FormularioData, ESPECIES, SEXOS } from './formularioHelpers'
import styles from '../../styles/MultistepForm.module.css'
import Cat from '../../public/svgs/cat.svg'
import Dog from '../../public/svgs/husky.svg'
import useLocalInputs from '@/app/_hooks/useLocalInputs'

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
  const { inputs, updateInputs } = useLocalInputs<PacienteBaseData>(data)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    updateInputs(e.target.id as keyof PacienteBaseData, e.target.value)
    update({ [e.target.id]: e.target.value })
  }
  const handleCheckboxToggle = (e: ChangeEvent<HTMLInputElement>) => {
    updateInputs('castrado', e.target.value === 'true')
    update({ castrado: e.target.value === 'true' })
  }
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateInputs(e.target.name as keyof PacienteBaseData, e.target.value)
    update({ [e.target.name]: e.target.value })
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
          value={inputs.nombrePaciente}
          onChange={handleChange}
          required
          autoFocus={!inputs.nombrePaciente}
        />
        {renderError('nombrePaciente')}
      </div>
      <div className="m-0 my-2 max-w-full sm:m-auto sm:w-3/5">
        <label htmlFor="especie">
          Especie:{' '}
          <span className="ml-2 text-base font-normal italic">
            {inputs.especie}
          </span>
        </label>
        <div className="my-2 flex items-center justify-center gap-4">
          <label
            htmlFor="felino"
            className={`flex aspect-square w-20 cursor-pointer flex-col items-center justify-center rounded-md bg-gray-200 ${
              inputs.especie === ESPECIES.GATO
                ? 'border-primary border-4'
                : 'border-2 border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="especie"
              id="felino"
              value={ESPECIES.GATO}
              className="hidden"
              onChange={handleCheckboxChange}
            />
            <Cat
              className={`m-0 aspect-square h-full w-full shrink-0 grow ${
                inputs.especie === ESPECIES.GATO
                  ? 'text-primary p-0'
                  : 'text-primary/50 p-1'
              }`}
            />
          </label>
          <label
            htmlFor="canino"
            className={`flex aspect-square w-20 cursor-pointer items-center justify-center rounded-md bg-gray-200 ${
              inputs.especie === ESPECIES.PERRO
                ? 'border-primary border-4'
                : 'border-2 border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="especie"
              id="canino"
              value={ESPECIES.PERRO}
              className="hidden"
              onChange={handleCheckboxChange}
            />
            <Dog
              className={`m-0 aspect-square h-full w-full shrink-0 grow ${
                inputs.especie === ESPECIES.PERRO
                  ? 'text-primary p-0'
                  : 'text-primary/50 p-1'
              }`}
            />
          </label>
        </div>
        {renderError('expecie')}
      </div>
      <div className={styles.labeledInput}>
        <label htmlFor="raza">Raza</label>
        <input
          type="text"
          id="raza"
          value={inputs.raza}
          onChange={handleChange}
          required
        />
        {renderError('raza')}
      </div>
      <div className="m-0 my-2 max-w-full sm:m-auto sm:w-3/5">
        <label htmlFor="sexo">Sexo</label>
        <div className="my-2 flex items-center justify-center gap-4">
          <label
            htmlFor="hembra"
            className={`relative flex aspect-square w-20 cursor-pointer flex-col items-center justify-center rounded-md bg-gray-200 ${
              inputs.sexo === SEXOS.HEMBRA
                ? 'border-primary text-primary border-4'
                : 'border-2 border-gray-200 text-stone-400'
            }`}
          >
            <input
              type="radio"
              name="sexo"
              id="hembra"
              value={SEXOS.HEMBRA}
              className="hidden"
              onChange={handleCheckboxChange}
            />
            <p
              className={`${
                inputs.sexo === SEXOS.HEMBRA ? 'text-primary' : 'text-stone-400'
              } select-none`}
            >
              Hembra
            </p>
          </label>
          <label
            htmlFor="macho"
            className={`relative flex aspect-square w-20 cursor-pointer items-center justify-center rounded-md bg-gray-200 ${
              inputs.sexo === SEXOS.MACHO
                ? 'border-primary text-primary border-4'
                : 'border-2 border-gray-200 text-stone-400'
            }`}
          >
            <input
              type="radio"
              name="sexo"
              id="macho"
              value={SEXOS.MACHO}
              className="hidden"
              onChange={handleCheckboxChange}
            />
            <p
              className={`${
                inputs.sexo === SEXOS.MACHO ? 'text-primary' : 'text-stone-400'
              } select-none`}
            >
              Macho
            </p>
          </label>
        </div>
        {renderError('sexo')}
      </div>
      <div className="m-0 my-2 max-w-full sm:m-auto sm:w-3/5">
        <label htmlFor="castrado">
          ¿Está castrad{inputs.sexo === SEXOS.MACHO ? 'o' : 'a'}?
        </label>
        <div className="my-2 flex items-center justify-center gap-4">
          <label
            htmlFor="si"
            className={`relative flex aspect-square w-20 cursor-pointer flex-col items-center justify-center rounded-md bg-gray-200 ${
              inputs.castrado
                ? 'border-primary text-primary border-4'
                : 'border-2 border-gray-200 text-stone-400'
            }`}
          >
            <input
              type="radio"
              name="castrado"
              id="si"
              value="true"
              className="hidden"
              onChange={handleCheckboxToggle}
            />
            <p
              className={`${
                inputs.castrado ? 'text-primary' : 'text-stone-400'
              } select-none`}
            >
              Si
            </p>
          </label>
          <label
            htmlFor="no"
            className={`relative flex aspect-square w-20 cursor-pointer items-center justify-center rounded-md bg-gray-200 ${
              !inputs.castrado
                ? 'border-primary text-primary border-4'
                : 'border-2 border-gray-200 text-stone-400'
            }`}
          >
            <input
              type="radio"
              name="castrado"
              id="no"
              value="false"
              className="hidden"
              onChange={handleCheckboxToggle}
            />
            <p
              className={`${
                !inputs.castrado ? 'text-primary' : 'text-stone-400'
              } select-none`}
            >
              No
            </p>
          </label>
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
