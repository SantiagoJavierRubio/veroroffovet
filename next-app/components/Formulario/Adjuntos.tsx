import FormStep from "../MultiStepForm/FormStep"
import { FormularioData } from "./formularioHelpers"

interface AdjuntosProps {
    data: any
    update: (newData: Partial<FormularioData>) => void
}

export default function Adjuntos(props: AdjuntosProps) {
  return (
    <FormStep title="Imagenes y archivos">
        <div>
            <label></label>
            <input type="file" accept="image/png image/jpg image/jpeg image/gif" capture="environment" multiple required />
        </div>
    </FormStep>
  )
}
