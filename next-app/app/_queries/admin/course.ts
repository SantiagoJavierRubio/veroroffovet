import axios from 'axios'
import { Course } from '@prisma/client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { UpsertCourseInput } from '@/app/_lib/schemas/course'

async function getCourses() {
  return (await axios.get<Course[]>('/api/admin/course')).data
}

async function addOrEditCourse(data: UpsertCourseInput) {
  return await axios.post<Course>(`/api/admin/course/${data.id}`, data)
}

async function deleteCourse(id: string) {
  return await axios.delete(`/api/admin/course/${id}`)
}

export const useCourses = () => {
  const get = useQuery({
    queryKey: ['adminCourses'],
    queryFn: getCourses
  })

  const post = useMutation({
    mutationKey: ['adminCourses'],
    mutationFn: addOrEditCourse
  })

  const remove = useMutation({
    mutationKey: ['adminCoursesDelete'],
    mutationFn: deleteCourse
  })

  return { get, post, remove }
}
