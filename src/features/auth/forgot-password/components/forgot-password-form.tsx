import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Loader2 } from 'lucide-react'
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
import { useForgotPassword } from '@/hooks/useAuth'

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email')
    .email('Please enter a valid email'),
})

export function ForgotPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate()
  const forgotPassword = useForgotPassword()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    forgotPassword.mutate(data, {
      onSuccess: (response) => {
        setIsLoading(false)
        toast.success(response.message || 'Reset email sent successfully!')
        form.reset()
        navigate({ to: '/otp',search: { email: data.email } }) 
      },
      onError: (error: any) => {
        setIsLoading(false)
        toast.error(
          error?.message || 'Something went wrong. Please try again.'
        )
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-2', className)}
        {...props}
      >
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
        <Button
          type='submit'
          className='mt-2 bg-[#095555]'
          disabled={isLoading || forgotPassword.isPending}
        >
          {isLoading || forgotPassword.isPending ? (
            <>
              Sending...
              <Loader2 className='ml-2 animate-spin' size={16} />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className='ml-2' size={16} />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
