'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
import {
  specializations,
  experienceLevels,
  availabilityOptions,
  wilayas,
  cities,
} from '../data/data'
import { type Teacher } from '../data/schema'
import { useTeachers } from './teachers-provider'

const formSchema = z.object({
  firstName: z.string().min(1, 'First Name is required.'),
  lastName: z.string().min(1, 'Last Name is required.'),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  email: z.string().email('Email is required.'),
  phone: z.string().min(1, 'Phone number is required.'),
  address: z.string().optional(),
  city: z.string().optional(),
  wilaya: z.string().optional(),
  specialization: z.string().optional(),
  assignedHalqas: z.array(z.string()).optional(),
  yearsOfExperience: z.string().optional(),
  certification: z.string().optional(),
  availability: z.string().optional(),
  notes: z.string().optional(),
  status: z.string().min(1, 'Status is required.'),
})

type TeachersActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Teacher | null
}

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'On Leave', value: 'on_leave' },
]

export function TeachersActionDialog({
  open,
  onOpenChange,
  currentRow,
}: TeachersActionDialogProps) {
  const { t } = useTranslation()
  const { setOpen } = useTeachers()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentRow?.firstName || '',
      lastName: currentRow?.lastName || '',
      birthDate: currentRow?.birthDate || '',
      gender: currentRow?.gender || '',
      email: currentRow?.email || '',
      phone: currentRow?.phone || '',
      address: currentRow?.address || '',
      city: currentRow?.city || '',
      wilaya: currentRow?.wilaya || '',
      specialization: currentRow?.specialization || '',
      assignedHalqas: currentRow?.assignedHalqas || [],
      yearsOfExperience: currentRow?.yearsOfExperience || '',
      certification: currentRow?.certification || '',
      availability: currentRow?.availability || '',
      notes: currentRow?.notes || '',
      status: currentRow?.status || 'active',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    showSubmittedData(values)
    setOpen(null)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-screen overflow-y-auto sm:max-w-156.25'>
        <DialogHeader>
          <DialogTitle>
            {currentRow ? t('users.userForm.edit') : t('users.userForm.add')}{' '}
            {t('teachers.title')}
          </DialogTitle>
          <DialogDescription>
            {currentRow
              ? t('users.userForm.editDescription')
              : t('users.userForm.addDescription')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid gap-4 py-4'>
              {/* Personal Information */}
              <div className='text-lg font-semibold'>
                {t('teachers.personalInfo') || 'Personal Information'}
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('users.userForm.firstName')}</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter first name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('users.userForm.lastName')}</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter last name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='birthDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('teachers.birthDate')}</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='gender'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('teachers.gender')}</FormLabel>
                      <SelectDropdown
  items={genderOptions}
  defaultValue={field.value}
  onValueChange={field.onChange}
  isControlled
  placeholder='Select gender'
/>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information */}
              <div className='text-lg font-semibold'>
                {t('teachers.contactInfo') || 'Contact Information'}
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('users.userForm.email')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter email'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('users.columns.phone')}</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter phone number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('teachers.address') || 'Address'}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='Enter address' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('teachers.city')}</FormLabel>
                     <SelectDropdown
  items={statusOptions}
  defaultValue={field.value}
  onValueChange={field.onChange}
  isControlled
  placeholder="Select status"
/>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='wilaya'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('teachers.wilaya')}</FormLabel>
                      <SelectDropdown
  items={statusOptions}
  defaultValue={field.value}
  onValueChange={field.onChange}
  isControlled
  placeholder="Select status"
/>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Professional Information */}
              <div className='text-lg font-semibold'>
                {t('teachers.professionalInfo') || 'Professional Information'}
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='specialization'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('teachers.specialization')}</FormLabel>
                      <SelectDropdown
  items={statusOptions}
  defaultValue={field.value}
  onValueChange={field.onChange}
  isControlled
  placeholder="Select status"
/>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='yearsOfExperience'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('teachers.experience')}</FormLabel>
                     <SelectDropdown
  items={statusOptions}
  defaultValue={field.value}
  onValueChange={field.onChange}
  isControlled
  placeholder="Select status"
/>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='certification'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('teachers.certification')}</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter certification' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='availability'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('teachers.availability')}</FormLabel>
                      <SelectDropdown
  items={statusOptions}
  defaultValue={field.value}
  onValueChange={field.onChange}
  isControlled
  placeholder="Select status"
/>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('users.columns.status')}</FormLabel>
                     <SelectDropdown
  items={statusOptions}
  defaultValue={field.value}
  onValueChange={field.onChange}
  isControlled
  placeholder="Select status"
/>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Information */}
              <div className='text-lg font-semibold'>
                {t('teachers.additionalInfo') || 'Additional Information'}
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <FormField
                  control={form.control}
                  name='notes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('teachers.notes') || 'Notes'}</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter notes' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' className='bg-[#095555]'>
                {currentRow
                  ? t('users.userForm.update')
                  : t('users.userForm.add')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
