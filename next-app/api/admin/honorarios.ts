import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Honorarios } from '@/pages/asesorias'

async function getHonorarios() {
  return (await axios.get<Honorarios>('/api/admin/honorarios')).data
}

async function updateHonorarios(data: Honorarios) {
  return axios.post('/api/admin/honorarios', data)
}

export const useHonorarios = () => {
  const get = useQuery({
    queryKey: ['honorarios'],
    queryFn: getHonorarios
  })
  const post = useMutation({
    mutationKey: ['honorarios'],
    mutationFn: updateHonorarios,
    onSuccess: () => {
      get.refetch()
      setTimeout(() => post.reset, 900)
    }
  })

  return { get, post }
}
