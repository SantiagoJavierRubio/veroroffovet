import FormStep from '../MultiStepForm/FormStep'
import { FormularioData } from './formularioHelpers'
import FileUploader from '../FileUploader'
import { ChangeEvent } from 'react'

interface AdjuntosProps {
  data: FormularioData
  update: (newData: Partial<FormularioData>) => void
}

function convertToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = err => reject(err)
  })
}

export default function Adjuntos(props: AdjuntosProps) {
  const { update, data } = props
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    if (e.target.files.length > 1 || e.target.id === 'estudios') {
      const base64Promises = Array.from(e.target.files).map(file =>
        convertToBase64(file)
      )
      Promise.all(base64Promises)
        .then(base64files => {
          const formattedFiles = base64files
            .map((data, index) => {
              if (e.target.files && e.target.files[index]) {
                return {
                  filename: e.target.files[index].name,
                  data
                }
              }
            })
            .filter(entry => !!entry)
          update({ [e.target.id]: formattedFiles })
        })
        .catch(err => console.log(err))
    } else {
      const filename = e.target.files[0].name
      convertToBase64(e.target.files[0])
        .then(data => update({ [e.target.id]: { data, filename } }))
        .catch(err => console.log(err))
    }
  }
  return (
    <FormStep title="Imagenes y archivos">
      <div className="m-auto my-2 mt-8 grid w-3/5 max-w-full auto-cols-auto">
        <label htmlFor="fotoArriba" className="text-xl font-bold">
          Foto desde arriba
        </label>
        <input
          id="fotoArriba"
          type="file"
          accept="image/png image/jpg image/jpeg image/gif"
          capture="environment"
          onChange={handleFileChange}
          required
          className="m-4 rounded-sm font-normal"
          autoFocus
        />
      </div>
      <div className="m-auto my-2 grid w-3/5 max-w-full auto-cols-auto">
        <label htmlFor="fotoPerfil" className="text-xl font-bold">
          Foto de lado
        </label>
        <input
          id="fotoPerfil"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="m-4 rounded-sm font-normal"
          required
        />
      </div>
      <div className="m-auto my-2 grid w-3/5 max-w-full auto-cols-auto">
        <label htmlFor="estudios" className="text-xl font-bold">
          Estudios, informes, etc.{' '}
          <span className="text-base font-normal italic">
            (opcional)
            <br />
            Tambien podes mandarme alguna foto de su carita para que lo vaya
            conociendo
          </span>
        </label>
        <input
          id="estudios"
          type="file"
          accept="image/*,.pdf,.docx,.doc,application/msword,.xml,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className="m-4 rounded-sm font-normal"
          multiple
        />
      </div>
      <FileUploader
        dropInstruction="Arrastra tu archivo aqui"
        id="holis"
        required={true}
        capture="environment"
        accept="image/*"
        onChange={handleFileChange}
      />
    </FormStep>
  )
}
