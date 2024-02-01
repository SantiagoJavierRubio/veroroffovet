import { z } from 'zod'

const price = z
  .number({ coerce: true })
  .min(0, { message: 'Los honorarios deben ser mayores o iguales a 0' })

export const editHonorarios = z.object({
  asesorias: price,
  asesoriasControl: price,
  suplementacion: price,
  suplementacionControl: price,
  domicilio: price
})
