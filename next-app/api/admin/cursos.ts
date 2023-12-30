import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Curso } from '@prisma/client'

async function getCursos() {
  return (await axios.get<Curso[]>('/api/admin/courses')).data
}

async function editCursos(data: Curso[]) {
  return (await axios.post('/api/admin/courses', data)).data
}

export const useCursos = () => {
  const client = useQueryClient()
  const get = useQuery({ queryKey: ['cursos'], queryFn: getCursos })
  const post = useMutation({
    mutationKey: ['cursos'],
    mutationFn: editCursos,
    onSuccess: () => {
      client.refetchQueries({
        queryKey: ['cursos']
      })
      setTimeout(() => post.reset(), 900)
    }
  })
  return { get, post }
}
