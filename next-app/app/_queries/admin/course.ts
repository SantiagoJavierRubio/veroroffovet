import axios from 'axios'
import { Course } from '@prisma/client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { UpsertCourseInput } from '@/app/_lib/schemas/course'

async function getCourses() {
  return (await axios.get<Course[]>('/api/admin/course')).data
}

async function editCourse(data: UpsertCourseInput) {
  return await axios.post<Course>(`/api/admin/course/${data.id}`, data)
}

async function addCourse(data: Omit<UpsertCourseInput, 'id'>) {
  return await axios.post<Course>('/api/admin/course', data)
}

async function deleteCourse(id: string) {
  return await axios.delete(`/api/admin/course/${id}`)
}

export const useCourses = () => {
  const get = useQuery({
    queryKey: ['adminCourses'],
    queryFn: getCourses
  })

  const edit = useMutation({
    mutationKey: ['adminCoursesEdit'],
    mutationFn: editCourse
  })

  const add = useMutation({
    mutationKey: ['adminCoursesAdd'],
    mutationFn: addCourse,
    onSuccess: () => {
      get.refetch()
      setTimeout(() => add.reset(), 900)
    }
  })

  const remove = useMutation({
    mutationKey: ['adminCoursesDelete'],
    mutationFn: deleteCourse,
    onSuccess: () => get.refetch()
  })

  return { get, add, edit, remove }
}
