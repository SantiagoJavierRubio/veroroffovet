import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Education } from '@prisma/client'

export type EducationInput = Omit<Education, 'id'> & { id: string | undefined }

async function getEducation() {
  return (await axios.get<Education[]>('/api/admin/education')).data
}

async function editEducation(data: EducationInput[]) {
  return axios.post('/api/admin/education', data)
}

async function deleteEducation(id: Education['id']) {
  return axios.delete(`/api/admin/education?id=${id}`)
}

export const useEducation = () => {
  const get = useQuery({ queryKey: ['education'], queryFn: getEducation })

  const post = useMutation({
    mutationKey: ['educationPost'],
    mutationFn: editEducation,
    onSuccess: () => {
      get.refetch()
      setTimeout(() => post.reset(), 900)
    }
  })

  const deleteOne = useMutation({
    mutationKey: ['educationDelete'],
    mutationFn: deleteEducation,
    onSuccess: () => {
      get.refetch()
    }
  })

  return { get, post, deleteOne }
}
