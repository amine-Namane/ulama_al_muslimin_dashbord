import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { Link } from '@tanstack/react-router'
import { showSubmittedData } from '@/lib/show-submitted-data'
// import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PasswordInput } from '@/components/password-input'
import { useTranslation } from 'react-i18next'

const profileFormSchema = z.object({
  username: z
    .string('Please enter your username.')
    .min(2, 'Username must be at least 2 characters.')
    .max(30, 'Username must not be longer than 30 characters.'),
  email: z.email({
    error: (iss) =>
      iss.input === undefined
        ? 'Please select an email to display.'
        : undefined,
  }),
   password: z
    .string()
    .min(1, 'Please enter your password')
    .min(7, 'Password must be at least 7 characters long'),
  Description: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.url('Please enter a valid URL.'),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  urls: [
    { value: 'https://shadcn.com' },
    { value: 'http://twitter.com/shadcn' },
  ],
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })
const{t}=useTranslation()
  // const { fields, append } = useFieldArray({
  //   name: 'urls',
  //   control: form.control,
  // })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.fullName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('settings.fields.fullName')} {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.email')}</FormLabel>
                <FormControl>
                 <Input placeholder={t('settings.fields.email')} {...field} />
                </FormControl>
              {/* <FormDescription>
                You can manage verified email addresses in your{' '}
                <Link to='/'>email settings</Link>.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
       
         <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='relative'>
                      <FormLabel>{t('settings.password')}</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder='********' {...field} />
                      </FormControl>
                      <FormMessage />
                      {/* <Link
                        to='/forgot-password'
                        className='text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75'
                      >
                        Forgot password?
                      </Link> */}
                    </FormItem>
                  )}
                />
                 <FormField
          control={form.control}
          name='Description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.descriptions')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('settings.fields.description')}
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            Add URL
          </Button>
        </div> */}
        <Button type='submit' className='bg-[#095555]'> {t('settings.actions.updateProfile')}</Button>
      </form>
    </Form>
  )
}
