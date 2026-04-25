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
import { grades } from '../data/data'
import { type Student } from '../data/schema'
import { useStudents } from './students-provider'

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
  selectedHalqa: z.string().optional(),
  memorizedJuz: z.string().optional(),
  previousExperience: z.string().optional(),
  learningGoals: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  grade: z.string().min(1, 'Grade is required.'),
})

type StudentsActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Student | null
}

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

const wilayas = [
  { label: 'Adrar', value: 'Adrar' },
  { label: 'Ain Defla', value: 'Ain Defla' },
  { label: 'Ain Temouchent', value: 'Ain Temouchent' },
  { label: 'Alger', value: 'Alger' },
  { label: 'Annaba', value: 'Annaba' },
  { label: 'Batna', value: 'Batna' },
  { label: 'Bechar', value: 'Bechar' },
  { label: 'Bejaia', value: 'Bejaia' },
  { label: 'Biskra', value: 'Biskra' },
  { label: 'Blida', value: 'Blida' },
  { label: 'Bordj Bou Arreridj', value: 'Bordj Bou Arreridj' },
  { label: 'Bouira', value: 'Bouira' },
  { label: 'Boumerdes', value: 'Boumerdes' },
  { label: 'Chlef', value: 'Chlef' },
  { label: 'Constantine', value: 'Constantine' },
  { label: 'Djelfa', value: 'Djelfa' },
  { label: 'El Bayadh', value: 'El Bayadh' },
  { label: 'El Oued', value: 'El Oued' },
  { label: 'El Tarf', value: 'El Tarf' },
  { label: 'Ghardaia', value: 'Ghardaia' },
  { label: 'Guelma', value: 'Guelma' },
  { label: 'Illizi', value: 'Illizi' },
  { label: 'Jijel', value: 'Jijel' },
  { label: 'Khenchela', value: 'Khenchela' },
  { label: 'Laghouat', value: 'Laghouat' },
  { label: 'Lemdi', value: 'Lemdi' },
  { label: 'Mascara', value: 'Mascara' },
  { label: 'Medea', value: 'Medea' },
  { label: 'Mila', value: 'Mila' },
  { label: 'Mostaganem', value: 'Mostaganem' },
  { label: 'Naama', value: 'Naama' },
  { label: 'Oran', value: 'Oran' },
  { label: 'Ouargla', value: 'Ouargla' },
  { label: 'Oued', value: 'Oued' },
  { label: 'Relizane', value: 'Relizane' },
  { label: 'Saida', value: 'Saida' },
  { label: 'Setif', value: 'Setif' },
  { label: 'Sidi Bel Abbes', value: 'Sidi Bel Abbes' },
  { label: 'Skikda', value: 'Skikda' },
  { label: 'Souk Ahras', value: 'Souk Ahras' },
  { label: 'Tamanrasset', value: 'Tamanrasset' },
  { label: 'Tebessa', value: 'Tebessa' },
  { label: 'Tiaret', value: 'Tiaret' },
  { label: 'Tindouf', value: 'Tindouf' },
  { label: 'Tipaza', value: 'Tipaza' },
  { label: 'Tissemsilt', value: 'Tissemsilt' },
  { label: 'Tizi Ouzou', value: 'Tizi Ouzou' },
  { label: 'Tlemcen', value: 'Tlemcen' },
]

const cities = [
  { label: 'Algiers', value: 'Algiers' },
  { label: 'Oran', value: 'Oran' },
  { label: 'Constantine', value: 'Constantine' },
  { label: 'Annaba', value: 'Annaba' },
  { label: 'Blida', value: 'Blida' },
  { label: 'Batna', value: 'Batna' },
  { label: 'Khenchela', value: 'Khenchela' },
  { label: 'Biskra', value: 'Biskra' },
  { label: 'Bejaia', value: 'Bejaia' },
  { label: 'Tizi Ouzou', value: 'Tizi Ouzou' },
  { label: 'Setif', value: 'Setif' },
  { label: 'Sidi Bel Abbes', value: 'Sidi Bel Abbes' },
]

const halqas = [
  { label: 'Halqa 1', value: 'Halqa 1' },
  { label: 'Halqa 2', value: 'Halqa 2' },
  { label: 'Halqa 3', value: 'Halqa 3' },
  { label: 'Halqa 4', value: 'Halqa 4' },
  { label: 'Halqa 5', value: 'Halqa 5' },
  { label: 'Halqa 6', value: 'Halqa 6' },
  { label: 'Halqa 7', value: 'Halqa 7' },
  { label: 'Halqa 8', value: 'Halqa 8' },
  { label: 'Halqa 9', value: 'Halqa 9' },
  { label: 'Halqa 10', value: 'Halqa 10' },
]

const JuzOptions = [
  { label: 'Juz 1', value: 'Juz 1' },
  { label: 'Juz 2', value: 'Juz 2' },
  { label: 'Juz 3', value: 'Juz 3' },
  { label: 'Juz 4', value: 'Juz 4' },
  { label: 'Juz 5', value: 'Juz 5' },
  { label: 'Juz 1-5', value: 'Juz 1-5' },
  { label: 'Juz 1-10', value: 'Juz 1-10' },
  { label: 'Juz 1-15', value: 'Juz 1-15' },
  { label: 'Juz 1-20', value: 'Juz 1-20' },
  { label: 'Juz 1-30', value: 'Juz 1-30' },
]

const experienceOptions = [
  { label: 'None', value: 'None' },
  { label: '1 year', value: '1 year' },
  { label: '2 years', value: '2 years' },
  { label: '3 years', value: '3 years' },
  { label: '4+ years', value: '4+ years' },
]

const learningGoalsOptions = [
  { label: 'Memorize Quran', value: 'Memorize Quran' },
  { label: 'Tajweed', value: 'Tajweed' },
  { label: 'Islamic studies', value: 'Islamic studies' },
  { label: 'Both', value: 'Both' },
]

export function StudentsActionDialog({
  open,
  onOpenChange,
  currentRow,
}: StudentsActionDialogProps) {
  const { t } = useTranslation()
  const { setOpen } = useStudents()

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
      selectedHalqa: currentRow?.selectedHalqa || '',
      memorizedJuz: currentRow?.memorizedJuz || '',
      previousExperience: currentRow?.previousExperience || '',
      learningGoals: currentRow?.learningGoals || '',
      guardianName: currentRow?.guardianName || '',
      guardianPhone: currentRow?.guardianPhone || '',
      grade: currentRow?.grade || '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    showSubmittedData(values)
    setOpen(null)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-screen overflow-y-auto sm:max-w-[625px]'>
        <DialogHeader>
          <DialogTitle>
            {currentRow ? t('users.userForm.edit') : t('users.userForm.add')}{' '}
            {t('students.title')}
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
                {t('students.personalInfo') || 'Personal Information'}
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
                      <FormLabel>{t('students.birthDate')}</FormLabel>
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
                      <FormLabel>{t('students.gender')}</FormLabel>
                      <SelectDropdown
                        options={genderOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Select gender'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information */}
              <div className='text-lg font-semibold'>
                {t('students.contactInfo') || 'Contact Information'}
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
                        {t('students.address') || 'Address'}
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
                      <FormLabel>{t('students.city')}</FormLabel>
                      <SelectDropdown
                        options={cities}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Select city'
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
                      <FormLabel>{t('students.wilaya')}</FormLabel>
                      <SelectDropdown
                        options={wilayas}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Select wilaya'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Academic Information */}
              <div className='text-lg font-semibold'>
                {t('students.academicInfo') || 'Academic Information'}
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='selectedHalqa'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('students.halqa')}</FormLabel>
                      <SelectDropdown
                        options={halqas}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Select halqa'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='memorizedJuz'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('students.memorizedJuz')}</FormLabel>
                      <SelectDropdown
                        options={JuzOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Select memorized juz'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='previousExperience'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('students.previousExperience') ||
                          'Previous Experience'}
                      </FormLabel>
                      <SelectDropdown
                        options={experienceOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Select experience'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='learningGoals'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('students.learningGoals') || 'Learning Goals'}
                      </FormLabel>
                      <SelectDropdown
                        options={learningGoalsOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Select learning goals'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='grade'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('students.grade')}</FormLabel>
                      <SelectDropdown
                        options={grades}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Select grade'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Guardian Information */}
              <div className='text-lg font-semibold'>
                {t('students.guardianInfo') || 'Guardian Information'}
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='guardianName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('students.guardianName')}</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter guardian name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='guardianPhone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('students.guardianPhone')}</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter guardian phone' {...field} />
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
