import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Curso } from '@prisma/client'

async function getCursos() {
  return (await axios.get<Curso[]>('/api/admin/courses')).data
}

async function editCursos(data: Curso[]) {
  return axios.post('/api/admin/courses', data)
}

export const useCursos = () => {
  const get = useQuery({ queryKey: ['cursos'], queryFn: getCursos })
  const post = useMutation({
    mutationKey: ['cursos'],
    mutationFn: editCursos,
    onSuccess: () => {
      get.refetch()
      setTimeout(() => post.reset(), 900)
    }
  })
  return { get, post }
}
