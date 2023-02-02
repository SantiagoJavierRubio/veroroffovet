import { ChangeEvent, DragEvent, useEffect, useRef } from 'react'
import Image from 'next/image'

interface FileUploaderProps {
  dropInstruction?: string
  accept: string
  required: boolean
  capture: boolean | 'user' | 'environment' | undefined
  logoURL?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  id: string
  value?: {
    name: string
    size: string
    extension: string
  }
  multiple?: boolean
}

export default function FileUploader({
  required,
  capture,
  logoURL,
  accept,
  onChange,
  id,
  value,
  dropInstruction,
  multiple = false
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (!inputRef.current) return
    window.addEventListener('drop', e => e.preventDefault())
    window.addEventListener('dragOver', e => e.preventDefault())
    return () => {
      window.removeEventListener('drop', e => e.preventDefault())
      window.removeEventListener('dragOver', e => e.preventDefault())
    }
  }, [inputRef])
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!inputRef.current) return
    if (!multiple && e.dataTransfer.files.length > 1)
      return alert('Too many files for this field')
    inputRef.current.files = e.dataTransfer.files
  }
  return (
    <div
      className="flex flex-col items-center justify-center gap-8 rounded-md border-4 border-dashed border-gray-500/10 bg-transparent p-8"
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p className="text-center text-xl font-bold">
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
      <input
        type="file"
        required={required}
        capture={capture}
        accept={accept}
        onChange={onChange}
        className="hidden"
        id={id}
        multiple={multiple}
        ref={inputRef}
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
