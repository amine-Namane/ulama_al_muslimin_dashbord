import { createFileRoute } from '@tanstack/react-router'
import { ResettPassword } from '@/features/auth/reset-password'
export const Route = createFileRoute('/(auth)/reset-password')({
  component:ResettPassword ,
   validateSearch: (search) => ({
    email: search.email as string | undefined,
    code:search.otp as string | undefined
  }),
})


