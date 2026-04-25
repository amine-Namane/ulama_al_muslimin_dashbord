import { apiClient } from '@/utils/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { toast } from 'sonner'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: any) => {
      const { data } = await apiClient.post('/admin/users', userData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}