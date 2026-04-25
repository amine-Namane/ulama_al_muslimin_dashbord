import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { apiClient } from '@/utils/axios'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  code: z.string().min(4, 'Enter your OTP code'),
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
})

export function ResetPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate()
  const search = useSearch({ from: '/(auth)/reset-password' })
  const [isLoading, setIsLoading] = useState(false)

  // ✅ prefill email from query if available
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: search.email || '', code: search.code || '', newPassword: '' },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await apiClient('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          code: data.code,
          newPassword: data.newPassword,
        }),
      })

      if (response.status) {
        toast.success(response.message || 'Password reset successful!')
        navigate({ to: '/sign-in' })
      } else {
        toast.error(response.message || 'Invalid code or email.')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       

        {/* New Password */}
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your new password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type='submit'
          className='mt-2 bg-[#095555]'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Resetting...
              <Loader2 className='ml-2 animate-spin' size={16} />
            </>
          ) : (
            <>Reset Password</>
          )}
        </Button>
      </form>
    </Form>
  )
}
