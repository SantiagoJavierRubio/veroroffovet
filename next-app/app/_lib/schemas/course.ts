import { z } from 'zod'

export const addCourse = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  attachment: z.string().optional(),
  url: z.string().url().optional(),
  enabled: z.coerce.boolean()
})

export const editCourse = z
  .object({
    id: z.string().min(1)
  })
  .and(addCourse.partial())

export type AddCourseInput = z.infer<typeof addCourse>
export type EditCourseInput = z.infer<typeof editCourse>
