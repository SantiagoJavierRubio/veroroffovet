import { ChangeEvent } from "react"
import FormStep from "../MultiStepForm/FormStep"
import { FormularioData } from "./formularioHelpers"
import CondicionImageSelect from "./CondicionImageSelect"

interface PacienteCondicionData {
    peso: FormularioData["peso"]
    otrosAnimales: FormularioData["otrosAnimales"]
    dietaActual: FormularioData["dietaActual"]
    actividad: FormularioData["actividad"]
    antecedentes: FormularioData["antecedentes"]
    graficoPeso: FormularioData["graficoPeso"]
    costillas: FormularioData["costillas"]
    especie: FormularioData["especie"]
    sexo: FormularioData["sexo"]
}

interface PacienteCondicionProps {
    data: PacienteCondicionData
    update: (newData: Partial<PacienteCondicionData>) => void
}

export default function PacienteCondicion(props: PacienteCondicionProps) {
    const { data, update } = props
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if(e.target.type === "number") {
            update({[e.target.id]: parseFloat(e.target.value)})
        } else update({[e.target.id]: e.target.value})
    }
  return (
    <FormStep title="Condicion del paciente">
        <div>
            <label htmlFor="peso">Peso</label>
            <input
                type="number"
                id="peso"
                step="0.1"
                min="0"
                value={data.peso}
                onChange={handleChange}
                required
            /> Kg
            <p>* Para pesarlo en casa con balanza de piso: pesarse con el animal alzado, luego sin el y hacer la resta.<br /> 
                Por ejemplo: humano + animal = 70kg; humano = 60kg; Peso del animal ={">"} 70kg - 60kg = 10Kg
            </p>
        </div>
        <div>
            <label htmlFor="otrosAnimales">Convive con otros animales? <span>(especificar)</span></label>
            <textarea 
                id="otrosAnimales"
                value={data.otrosAnimales}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="dietaActual">
                Que come actualmente? {" "}
                <span>(si es un ultraprocesado/balanceado indicar marca y tipo)</span>
            </label>
            <textarea
                id="dietaActual"
                value={data.dietaActual}
                required
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="actividad">Nivel de actividad {" "}
                <span>(indicar si sale a pasear, cuanto tiempo y frecuencia, si juega en casa, etc)</span>
            </label>
            <textarea
                id="actividad"
                value={data.actividad}
                required
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="antecedentes">Antecedentes de alguna patologia o algo que creas importante contarme</label>
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
    </FormStep>
  )
}
