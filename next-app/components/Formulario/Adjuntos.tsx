import { useEffect, useState } from 'react'
import FormStep from '../MultiStepForm/FormStep'
import {
  FormularioData,
  attachment,
  FormularioKey,
  convertToBase64,
  calculateAttachmentSizes
} from './formularioHelpers'
import FileUploader, { FileInputs, RemoveFileInput } from '../FileUploader'
import { MdOutlineReportProblem } from 'react-icons/md'

interface AdjuntosProps {
  data: FormularioData
  update: (newData: Partial<FormularioData>) => void
  errors: Map<string, string>
}

interface AttachmentSize {
  fileSizes: {
    [key: string]: number
  }
  totalSize: number
}

const MAX_ATTACHMENT_KB = 9000

export default function Adjuntos(props: AdjuntosProps) {
  const { update, data, errors } = props
  const [attachmentSizes, setAttachmentSizes] = useState<AttachmentSize>({
    fileSizes: {},
    totalSize: 0
  })

  useEffect(() => {
    const newSizes = calculateAttachmentSizes(
      [...data.estudios, data.fotoArriba, data.fotoPerfil].filter(
        at => at !== null
      )
    )
    setAttachmentSizes(newSizes)
    const continueButton = document.querySelector(
      '#continueBtn'
    ) as HTMLButtonElement
    if (newSizes.totalSize > MAX_ATTACHMENT_KB) {
      continueButton.disabled = true
    } else continueButton.disabled = false

    return () => {
      continueButton.disabled = false
    }
  }, [data.fotoArriba, data.fotoPerfil, data.estudios, data.estudios.length])

  const renderError = (fieldName: string) => (
    <p className="px-2 text-right text-sm font-normal italic text-red-500">
      {errors.has(fieldName) && '* ' + errors.get(fieldName)}
    </p>
  )

  const handleFileChange = async ({ files, fieldId }: FileInputs) => {
    if (!files || !files[0]) return
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
          capture={undefined}
          accept="image/*"
          uploadFiles={handleFileChange}
          values={[data.fotoArriba]}
          removeFiles={removeFiles}
          sizes={attachmentSizes.fileSizes}
        />
        {renderError('fotoArriba')}
      </div>
      <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
        <label htmlFor="fotoPerfil" className="text-xl font-bold">
          Foto de lado
        </label>
        <FileUploader<attachment | null>
          dropInstruction="Arrastra tu archivo aqui"
          id="fotoPerfil"
          required={false}
          capture={undefined}
          accept="image/*"
          uploadFiles={handleFileChange}
          values={[data.fotoPerfil]}
          removeFiles={removeFiles}
          sizes={attachmentSizes.fileSizes}
        />
        {renderError('fotoPerfil')}
      </div>
      <div className="m-auto my-2 grid w-full max-w-full auto-cols-auto sm:w-3/5">
        <label htmlFor="estudios" className="text-xl font-bold">
          Estudios, informes, etc.{' '}
          <span className="text-base font-normal italic">
            (opcional)
            <br />
            También podés mandarme alguna foto de su carita para que lo vaya
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
          sizes={attachmentSizes.fileSizes}
        />
        {renderError('estudios')}
      </div>
      {attachmentSizes.totalSize > MAX_ATTACHMENT_KB && (
        <div className="relative m-2 rounded-md border-2 border-red-500 p-4 pt-8">
          <MdOutlineReportProblem className="absolute top-0 left-[50%] h-8 w-8 -translate-x-1/2 text-red-500" />
          <p className="text-center text-lg font-bold text-red-500">
            ¡Archivos adjuntos demasiado pesados!
          </p>
          <p className="text-center font-normal italic">
            Considera bajarle la calidad a las fotos o subirlas a la nube y
            pasarme el link en la siguiente pantalla
          </p>
        </div>
      )}
    </FormStep>
  )
}
