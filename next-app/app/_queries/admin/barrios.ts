import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Barrio } from '@prisma/client'

async function getBarrios() {
  return (await axios.get<Barrio[]>('/api/admin/barrios')).data
}

export type UpdateBarriosInput = {
  toAdd: Barrio[]
  toDelete: string[]
}

async function updateBarrios({ toAdd, toDelete }: UpdateBarriosInput) {
  return axios.post('/api/admin/barrios', {
    new: toAdd,
    delete: toDelete
  })
}

export const useBarrios = () => {
  const get = useQuery({
    queryKey: ['barrios'],
    queryFn: getBarrios,
    initialData: []
  })

  const post = useMutation({
    mutationKey: ['barrios'],
    mutationFn: updateBarrios,
    onSuccess: () => {
      get.refetch()
      setTimeout(() => post.reset(), 900)
    }
  })
  return { get, post }
}
