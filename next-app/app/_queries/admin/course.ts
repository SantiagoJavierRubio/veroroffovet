import axios from 'axios'
import { Course } from '@prisma/client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AddCourseInput, EditCourseInput } from '@/app/_lib/schemas/course'

async function getCourses() {
  return (await axios.get<Course[]>('/api/admin/course')).data
}

async function getOneCourse(id?: string) {
  return (await axios.get<Course>('/api/admin/course/' + id)).data
}

async function editCourse(data: EditCourseInput) {
  return await axios.post<Course>(`/api/admin/course/${data.id}`, data)
}

async function addCourse(data: AddCourseInput) {
  return await axios.post<Course>('/api/admin/course', data)
}

async function deleteCourse(id: string) {
  return await axios.delete(`/api/admin/course/${id}`)
}

export const useCourses = (id?: string) => {
  const get = useQuery({
    queryKey: ['adminCourses'],
    queryFn: getCourses
  })

  const getOne = useQuery({
    queryKey: ['adminCourses', id],
    queryFn: () => getOneCourse(id),
    enabled: !!id
  })

  const edit = useMutation({
    mutationKey: ['adminCoursesEdit'],
    mutationFn: editCourse,
    onSuccess: () => getOne.refetch()
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

  return { get, getOne, add, edit, remove }
}
