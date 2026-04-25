import { apiClient } from '@/utils/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
type Permission = {
  module: string
  actions: string[]
  label?: string
  value?: string
}
type Roles={
  roleName:string
}


export const useCreateRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (roleData: any) => {
      const { data } = await apiClient.post('/admin/role', roleData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
}
export const useGetRole = () => {
  return useQuery<Roles[]>({
    queryKey: ['roless'],
    queryFn: async () => {
      const response = await apiClient('/admin/role/role-permissions')
      return response.data.data
    },
  })
}
export const usePermissions = () => {
  return useQuery<Permission[]>({
    queryKey: ['permissions'],
    queryFn: async () => {
      const response = await apiClient('/admin/role/permissions')
      return response.data
    },
  })
}