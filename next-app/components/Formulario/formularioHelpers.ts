import { z } from 'zod'
import { ZodError } from 'zod/lib'
import Resizer from 'react-image-file-resizer'

export const DIET_TYPES = {
  BARF: 'BARF',
  COCIDA: 'Natural cocida',
  MIXTA: 'Mixta',
  SUPLEMENTADA: 'Suplementación de ultraprocesados',
  NSNC: 'No se'
}

export const ESPECIES = {
  PERRO: 'canino',
  GATO: 'felino'
}

export const SEXOS = {
  MACHO: 'macho',
  HEMBRA: 'hembra'
}

export const COSTILLAS_TEXT = [
  'Es imposible contarle las costillas',
  'Pude contarlas pero tuve que hacer mucha presión para sentirlas',
  'Las conté con facilidad',
  'Ni necesité palpar, se ven a simple vista'
]

export interface attachment {
  filename: string
  data: string | null
}

export type FormularioData = {
  nombreTutor: string
  apellidoTutor: string
  mail: string
  celular: string | undefined
  dietaElegida: string
  nombrePaciente: string
  especie: string
  raza: string
  sexo: string
  castrado: boolean
  edad: string
  peso: number
  otrosAnimales: string | undefined
  dietaActual: string
  actividad: string
  antecedentes: string | undefined
  graficoPeso: number
  costillas: number
  fotoPerfil: attachment | null
  fotoArriba: attachment | null
  estudios: attachment[]
  disponibilidad: {
    [key: string]: string | undefined
    lunes: string | undefined
    martes: string | undefined
    miercoles: string | undefined
    jueves: string | undefined
    viernes: string | undefined
  }
  aclaraciones: string | undefined
}

export const DEFAULT_VALUES: FormularioData = {
  nombreTutor: '',
  apellidoTutor: '',
  mail: '',
  celular: '',
  dietaElegida: DIET_TYPES.BARF,
  nombrePaciente: '',
  especie: ESPECIES.PERRO,
  raza: '',
  sexo: SEXOS.HEMBRA,
  castrado: false,
  edad: '',
  peso: 0,
  otrosAnimales: '',
  dietaActual: '',
  actividad: '',
  antecedentes: '',
  graficoPeso: 0,
  costillas: 0,
  fotoPerfil: null,
  fotoArriba: null,
  estudios: [],
  disponibilidad: {
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: ''
  },
  aclaraciones: ''
}

export type FormularioKey = keyof typeof DEFAULT_VALUES

const tutorSchema = z.object({
  nombreTutor: z
    .string()
    .trim()
    .min(3, { message: 'Debe tener al menos 3 caracteres' }),
  apellidoTutor: z.string().trim().min(3, {
    message: 'Debe tener al menos 3 caracteres'
  }),
  mail: z.string().email({ message: 'Debe ser un email válido ' }),
  celular: z.string().nullish(),
  dietaElegida: z.string()
})

const patientSchema = z.object({
  nombrePaciente: z
    .string()
    .trim()
    .min(2, { message: 'Debe tener al menos 2 caracteres' }),
  especie: z.string(),
  raza: z
    .string()
    .trim()
    .min(3, { message: 'Debe tener al menos 3 caracteres' }),
  sexo: z.string(),
  castrado: z.boolean(),
  edad: z.string().trim().min(1, { message: 'Debe ser mayor a 0' })
})

const conditionSchema = z.object({
  peso: z.number().positive({ message: 'Debe ser mayor a 0' }),
  otrosAnimales: z.string().nullish(),
  dietaActual: z
    .string()
    .trim()
    .min(5, { message: 'Debe tener al menos 5 caracteres' }),
  actividad: z
    .string()
    .trim()
    .min(5, { message: 'Debe tener al menos 5 caracteres' }),
  antecedentes: z.string().nullish(),
  graficoPeso: z
    .number()
    .int()
    .positive({ message: 'Debes seleccionar alguna opción ' })
    .lte(5),
  costillas: z.number().int().nonnegative().lt(4)
})

const attachmentSchema = z.object({
  filename: z.string(),
  data: z.string()
})

const attachmentsSchema = z.object({
  fotoPerfil: attachmentSchema,
  fotoArriba: attachmentSchema,
  estudios: z.array(attachmentSchema)
})

const availabilitySchema = z.object({
  disponibilidad: z.object({
    lunes: z.string().trim().min(1).nullish(),
    martes: z.string().trim().min(1).nullish(),
    miercoles: z.string().trim().min(1).nullish(),
    jueves: z.string().trim().min(1).nullish(),
    viernes: z.string().trim().min(1).nullish()
  }),
  aclaraciones: z.string().nullish()
})

const formSchema = tutorSchema
  .and(patientSchema)
  .and(conditionSchema)
  .and(attachmentSchema)
  .and(availabilitySchema)

const getSchema = (index: number) => {
  switch (index) {
    case 0:
      return tutorSchema
    case 1:
      return patientSchema
    case 2:
      return conditionSchema
    case 3:
      return attachmentsSchema
    default:
      return formSchema
  }
}

function parseZodErrors(errors: ZodError) {
  return new Map(
    errors.issues.map(err => [
      err.path[0].toString(),
      err.code === 'invalid_type' ? 'Campo requerido' : err.message
    ])
  )
}

export function validateStep(data: FormularioData, index: number) {
  const schema = getSchema(index)
  const parse = schema.safeParse(data)
  return parse.success
    ? { success: true, error: null }
    : { success: parse.success, error: parseZodErrors(parse.error) }
}

function calculateBase64FileSize(file: attachment | null) {
  if (!file || !file.data) return 0
  const base64 = file.data?.substring(file.data.indexOf(',') + 1)
  return Math.ceil((base64.length * 6) / 8 / 1000)
}

export function calculateAttachmentSizes(files: (attachment | null)[]) {
  const fileSizes: { [key: string]: number } = {}
  let totalInKb = 0
  files.forEach(file => {
    if (file) {
      const size = calculateBase64FileSize(file)
      fileSizes[file.filename] = size
      totalInKb += size
    }
  })
  return {
    totalSize: totalInKb,
    fileSizes
  }
}

const resizeImage = (file: File) =>
  new Promise(resolve =>
    Resizer.imageFileResizer(
      file,
      600,
      600,
      'JPEG',
      100,
      0,
      uri => resolve(uri),
      'base64',
      200
    )
  )

export function convertToBase64(file: File) {
  if (file.type.includes('image')) return resizeImage(file)
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = err => reject(err)
  })
}
