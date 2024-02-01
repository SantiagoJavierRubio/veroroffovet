import useLocalInputs from '@/app/_hooks/useLocalInputs'
import { ChangeEvent, useState } from 'react'
import FormStep from '@/app/_components/form/MultiStepForm/FormStep'
import type { FormularioData } from './formularioHelpers'

interface DisponibilidadData {
  disponibilidad: FormularioData['disponibilidad']
  aclaraciones: FormularioData['aclaraciones']
}

interface DisponibilidadProps {
  data: DisponibilidadData
  update: (newData: Partial<FormularioData>) => void
}

export default function Disponibilidad(props: DisponibilidadProps) {
  const { data, update } = props
  const { inputs, updateInputs } = useLocalInputs<DisponibilidadData>(data)

  const [checkedDays, setCheckedDays] = useState<string[]>(() => {
    const checked: string[] = []
    Object.entries(data.disponibilidad).forEach(([day, value]) => {
      if (value) checked.push(day)
    })
    return checked
  })

  const checkDay = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedDays(prev => {
      if (prev.includes(e.target.id)) {
        updateInputs('disponibilidad', {
          ...inputs.disponibilidad,
          [e.target.id]: undefined
        })
        update({
          disponibilidad: {
            ...data.disponibilidad,
            [e.target.id]: undefined
          }
        })
        return prev.filter(val => val !== e.target.id)
      } else {
        return [...prev, e.target.id]
      }
    })
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateInputs(e.target.id as keyof DisponibilidadData, e.target.value)
    update({ [e.target.id]: e.target.value })
  }

  const handleChangeDisponiblidad = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateInputs('disponibilidad', {
      ...inputs.disponibilidad,
      [e.target.id]: e.target.value
    })
    update({
      disponibilidad: {
        ...data.disponibilidad,
        [e.target.id]: e.target.value
      }
    })
  }

  return (
    <FormStep title="Disponibilidad horaria">
      <div className="items-between mx-0 mt-4 flex flex-col justify-center gap-4 sm:mx-auto sm:items-center">
        {Object.keys(inputs.disponibilidad).map(day => (
          <div
            key={day}
            className="grid grid-cols-[25%_70%] items-center gap-4 sm:grid-cols-2"
          >
            <div className="flex justify-between gap-1 sm:justify-end sm:gap-4">
              <label htmlFor={day} className="capitalize">
                {day}
              </label>
              <input
                type="checkbox"
                id={day}
                checked={checkedDays.includes(day)}
                onChange={checkDay}
              />
            </div>
            <textarea
              id={day}
              value={inputs.disponibilidad[day]}
              onChange={handleChangeDisponiblidad}
              disabled={!checkedDays.includes(day)}
              className="bg-secondary min-h-[3rem] rounded-sm p-2 font-semibold text-white placeholder:text-gray-500 disabled:text-gray-500"
              placeholder="Horarios"
              required={checkedDays.includes(day)}
            />
          </div>
        ))}
      </div>
      <div className="m-auto my-4 grid w-full max-w-full auto-cols-auto sm:w-3/5">
        <label htmlFor="aclaraciones" className="font-normal italic">
          ¿Alguna aclaración que quieras hacer?
        </label>
        <textarea
          id="aclaraciones"
          value={inputs.aclaraciones}
          onChange={handleChange}
          cols={5}
          className="bg-secondary rounded-sm p-2 text-white"
        />
      </div>
      <p className="mb-4 text-center text-base font-normal text-red-400">
        ¿Necesitás asesoría para más de un peludo? Al finalizar podrás llenar
        otro formulario
      </p>
    </FormStep>
  )
}
