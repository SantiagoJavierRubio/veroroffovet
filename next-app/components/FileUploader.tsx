import { ChangeEvent, DragEvent } from 'react'
import { FaTrash } from 'react-icons/fa'
import Image from 'next/image'

export interface FileInputs {
  files: FileList
  fieldId: string
}

interface MinimalFileData {
  filename: string
}

export interface RemoveFileInput {
  fieldId: string
  index?: number
}

interface FileUploaderProps<T> {
  dropInstruction?: string
  accept: string
  required: boolean
  capture: boolean | 'user' | 'environment' | undefined
  logoURL?: string
  uploadFiles: (data: FileInputs) => void
  removeFiles: (data: RemoveFileInput) => void
  id: string
  multiple?: boolean
  values: T[]
  sizes: { [key: string]: number }
}

export default function FileUploader<T extends MinimalFileData | null>({
  required,
  capture,
  logoURL,
  accept,
  uploadFiles,
  removeFiles,
  id,
  values,
  dropInstruction,
  multiple = false,
  sizes
}: FileUploaderProps<T>) {
  if (values[0]) values[0].filename
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.target.files) return
    uploadFiles({ fieldId: id, files: e.target.files })
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!multiple && e.dataTransfer.files.length > 1)
      return alert('Too many files for this field')
    uploadFiles({ fieldId: id, files: e.dataTransfer.files })
  }
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-md border-4 border-solid border-gray-500/10 bg-transparent p-8 sm:gap-8 sm:border-dashed"
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p className="hidden text-center text-xl font-bold sm:block">
        {dropInstruction
          ? dropInstruction
          : multiple
          ? 'Drop your files here'
          : 'Drop your file here'}
      </p>
      <div className="relative h-12 w-12">
        <Image
          alt="fileTypeLogo"
          src={logoURL || `/svgs/${multiple ? 'files' : 'file'}-generic.svg`}
          fill={true}
        />
      </div>
      <div className="text-center text-base font-normal italic">
        {values.map(
          (val, index) =>
            val && (
              <div
                key={`${id}-${index}`}
                className="flex items-center justify-center"
              >
                <p>
                  {val?.filename}{' '}
                  <span className="text-secondary ml-2 text-base font-normal italic">
                    {sizes[val.filename] > 1000
                      ? `(${(sizes[val.filename] / 1000).toFixed(2)} Mb)`
                      : `(${sizes[val.filename]} Kb)`}
                  </span>
                </p>
                <button
                  onClick={() =>
                    removeFiles({
                      fieldId: id,
                      index: multiple ? index : undefined
                    })
                  }
                  type="button"
                  className="m-0 ml-2 flex h-6 w-6 items-center justify-center rounded-sm bg-transparent p-0 text-center text-base font-bold text-red-400"
                >
                  <FaTrash />
                </button>
              </div>
            )
        )}
      </div>
      <input
        type="file"
        required={required}
        capture={capture}
        accept={accept}
        onChange={handleChange}
        className="hidden"
        id={id}
        multiple={multiple}
      />
      <label
        htmlFor={id}
        className="text-primary bg-secondary cursor-pointer rounded-md p-4"
      >
        {multiple ? 'Elegir archivos' : 'Elegir un archivo'}
      </label>
    </div>
  )
}
