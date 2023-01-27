import { ChangeEvent } from "react"
import FormStep from "../MultiStepForm/FormStep"
import { FormularioData, ESPECIES, SEXOS } from "./formularioHelpers"

interface PacienteBaseData {
    nombrePaciente: FormularioData["nombrePaciente"]
    especie: FormularioData["especie"]
    raza: FormularioData["raza"]
    sexo: FormularioData["sexo"]
    castrado: FormularioData["castrado"]
    edad: FormularioData["edad"]
}

interface PacienteBaseProps {
    data: PacienteBaseData,
    update: (newData: Partial<PacienteBaseData>) => void
}

export default function PacienteBase(props: PacienteBaseProps) {
    const { data, update } = props
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        update({[e.target.id]: e.target.value})
    }
    const handleCheckboxToggle = (e: ChangeEvent<HTMLInputElement>) => {
        update({castrado: e.target.id === "true"})
    }
  return (
    <FormStep title="Datos del paciente">
        <div>
            <label htmlFor="nombrePaciente">Nombre</label>
            <input
                type="text"
                id="nombrePaciente"
                value={data.nombrePaciente}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="especie">Especie</label>
            <select
                id="especie"
                value={data.especie}
                onChange={handleChange}
                required
            >
                <option value={ESPECIES.GATO}>Gato</option>
                <option value={ESPECIES.PERRO}>Perro</option>
            </select>
        </div>
        <div>
            <label htmlFor="raza">Raza</label>
            <input
                type="text"
                id="raza"
                value={data.raza}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="sexo">Sexo</label>
            <select
                id="sexo"
                value={data.sexo}
                onChange={handleChange}
                required
            >
                <option value={SEXOS.MACHO}>Macho</option>
                <option value={SEXOS.HEMBRA}>Hembra</option>
            </select>
        </div>
        <div>
            <label htmlFor="castrado">Esta castrad{data.sexo === SEXOS.MACHO ? "o" : "a"}?</label>
            <label>Si</label>
            <input type="radio" name="castrado" id="true" onChange={handleCheckboxToggle} checked={data.castrado} />
            <label>No</label>
            <input type="radio" name="castrado" id="false" onChange={handleCheckboxToggle} checked={!data.castrado}/>
        </div>
        <div>
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
