import FormStep from '../MultiStepForm/FormStep'
import { FormularioData, attachment, FormularioKey } from './formularioHelpers'
import FileUploader, { FileInputs, RemoveFileInput } from '../FileUploader'

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
  const handleFileChange = async ({ files, fieldId }: FileInputs) => {
    if (!files) return
    if (files.length > 1 || fieldId === 'estudios') {
      const base64Promises = Array.from(files).map(file =>
        convertToBase64(file)
      )
      const key = fieldId as FormularioKey
      const currentFiles = data[key] as Array<attachment>
      Promise.all(base64Promises)
        .then(base64files => {
          const formattedFiles = base64files
            .map((data, index) => {
              if (files && files[index]) {
                return {
                  filename: files[index].name,
                  data
                }
              }
            })
            .filter(entry => !!entry)
          update({ [fieldId]: [...currentFiles, ...formattedFiles] })
        })
        .catch(err => console.log(err))
    } else {
      const filename = files[0].name
      convertToBase64(files[0])
        .then(data => update({ [fieldId]: { data, filename } }))
        .catch(err => console.log(err))
    }
  }
  const removeFiles = ({ fieldId, index }: RemoveFileInput) => {
    if (index === undefined) return update({ [fieldId]: null })
    const key = fieldId as FormularioKey
    const newArray = data[key] as Array<attachment>
    newArray.splice(index, 1)
    update({ [fieldId]: newArray })
  }
  return (
    <FormStep title="Imagenes y archivos">
      <div className="m-auto my-2 mt-8 grid w-full max-w-full auto-cols-auto sm:w-3/5">
        <label htmlFor="fotoArriba" className="text-xl font-bold">
          Foto desde arriba
        </label>
        <FileUploader<attachment | null>
          dropInstruction="Arrastra tu archivo aqui"
          id="fotoArriba"
          required={false}
          capture="environment"
          accept="image/*"
          uploadFiles={handleFileChange}
          values={[data.fotoArriba]}
          removeFiles={removeFiles}
        />
      </div>
      <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
        <label htmlFor="fotoPerfil" className="text-xl font-bold">
          Foto de lado
        </label>
        <FileUploader<attachment | null>
          dropInstruction="Arrastra tu archivo aqui"
          id="fotoPerfil"
          required={false}
          capture="environment"
          accept="image/*"
          uploadFiles={handleFileChange}
          values={[data.fotoPerfil]}
          removeFiles={removeFiles}
        />
      </div>
      <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
        <label htmlFor="estudios" className="text-xl font-bold">
          Estudios, informes, etc.{' '}
          <span className="text-base font-normal italic">
            (opcional)
            <br />
            Tambien podes mandarme alguna foto de su carita para que lo vaya
            conociendo
          </span>
        </label>
        <FileUploader<attachment | null>
          dropInstruction="Arrastra tus archivos aqui"
          id="estudios"
          required={false}
          capture={undefined}
          accept="image/*,.pdf,.docx,.doc,application/msword,.xml,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple
          uploadFiles={handleFileChange}
          values={data.estudios}
          removeFiles={removeFiles}
        />
      </div>
    </FormStep>
  )
}
