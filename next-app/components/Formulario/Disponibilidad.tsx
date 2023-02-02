import { ChangeEvent, useState } from 'react'
import FormStep from '../MultiStepForm/FormStep'
import type { FormularioData } from './formularioHelpers'

interface DisponibilidadProps {
  data: FormularioData
  update: (newData: Partial<FormularioData>) => void
}

export default function Disponibilidad(props: DisponibilidadProps) {
  const { data, update } = props
  const [checkedDays, setCheckedDays] = useState<string[]>([])

  const checkDay = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedDays(prev => {
      if (prev.includes(e.target.id)) {
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
    update({
      disponibilidad: {
        ...data.disponibilidad,
        [e.target.id]: e.target.value
      }
    })
  }

  return (
    <FormStep title="Disponibilidad horaria">
      <div className="mx-auto mt-4 flex flex-col items-center justify-center gap-4">
        {Object.keys(data.disponibilidad).map(day => (
          <div key={day} className="grid grid-cols-2 items-center gap-4">
            <div className="flex justify-end gap-4">
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
              value={data.disponibilidad[day]}
              onChange={handleChange}
              disabled={!checkedDays.includes(day)}
              className="min-h-[3rem] rounded-md p-2"
              placeholder="Horarios"
              required={checkedDays.includes(day)}
            />
          </div>
        ))}
      </div>
    </FormStep>
  )
}
