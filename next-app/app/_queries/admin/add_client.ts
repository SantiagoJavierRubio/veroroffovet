import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

async function addClient(email: string) {
  return axios.post('/api/admin/add_client', { email })
}

export const useAddClient = () => {
  const post = useMutation({
    mutationKey: ['new-client'],
    mutationFn: addClient,
    onSuccess: () => {
      setTimeout(() => post.reset(), 900)
    }
  })

  return { post }
}
