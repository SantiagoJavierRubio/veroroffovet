import { z } from 'zod'

export const upsertCourse = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  attachment: z.string().optional(),
  url: z.string().url().optional(),
  enabled: z.coerce.boolean()
})

export type UpsertCourseInput = z.infer<typeof upsertCourse>
