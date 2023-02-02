export const DIET_TYPES = {
  BARF: 'barf',
  COCIDA: 'cocida',
  MIXTA: 'mixta',
  SUPLEMENTADA: 'suplementada'
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
    lunes: undefined,
    martes: undefined,
    miercoles: undefined,
    jueves: undefined,
    viernes: undefined
  },
  aclaraciones: undefined
}
