import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Curso } from '@prisma/client'
import { CursoInput } from '@/pages/admin/cursos'

async function getCursos() {
  return (await axios.get<Curso[]>('/api/admin/courses')).data
}

async function editCursos(data: CursoInput[]) {
  return axios.post('/api/admin/courses', data)
}

async function deleteCurso(id: Curso['id']) {
  return axios.delete(`/api/admin/courses?id=${id}`)
}

export const useCursos = () => {
  const get = useQuery({ queryKey: ['cursos'], queryFn: getCursos })

  const post = useMutation({
    mutationKey: ['cursosPost'],
    mutationFn: editCursos,
    onSuccess: () => {
      get.refetch()
      setTimeout(() => post.reset(), 900)
    }
  })

  const deleteOne = useMutation({
    mutationKey: ['cursosDelete'],
    mutationFn: deleteCurso,
    onSuccess: () => {
      get.refetch()
    }
  })

  return { get, post, deleteOne }
}
