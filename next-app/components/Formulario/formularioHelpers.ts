import { z } from 'zod'
import { ZodError } from 'zod/lib'

export const DIET_TYPES = {
  BARF: 'BARF',
  COCIDA: 'Natural cocida',
  MIXTA: 'Mixta',
  SUPLEMENTADA: 'Suplementacion de ultraprocesados',
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
  'Pude contarlas pero tuve que hacer mucha presion para sentirlas',
  'Las conte con facilidad',
  'Ni necesite palpar, se ven a simple vista'
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
  aclaraciones: undefined
}

export type FormularioKey = keyof typeof DEFAULT_VALUES

const tutorSchema = z.object({
  nombreTutor: z.string().trim().min(3),
  apellidoTutor: z.string().trim().min(3),
  mail: z.string().email(),
  celular: z.string().nullish(),
  dietaElegida: z.string()
})

const patientSchema = z.object({
  nombrePaciente: z.string().trim().min(2),
  especie: z.string(),
  raza: z.string().trim().min(3),
  sexo: z.string(),
  castrado: z.boolean(),
  edad: z.string().trim().min(1)
})

const conditionSchema = z.object({
  peso: z.number().positive(),
  otrosAnimales: z.string().nullish(),
  dietaActual: z.string().trim().min(5),
  actividad: z.string().trim().min(5),
  antecedentes: z.string().nullish(),
  graficoPeso: z.number().int().positive().lte(5),
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
    errors.issues.map(err => [err.path[0].toString(), err.message])
  )
}

export function validateStep(data: FormularioData, index: number) {
  const schema = getSchema(index)
  const parse = schema.safeParse(data)
  return parse.success
    ? { success: true, error: null }
    : { success: parse.success, error: parseZodErrors(parse.error) }
}
