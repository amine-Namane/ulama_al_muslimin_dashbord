'use client'

import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useTeachers } from './teachers-provider'

interface TeachersPrimaryButtonsProps {}

export function TeachersPrimaryButtons({}: TeachersPrimaryButtonsProps) {
  const { t } = useTranslation()
  const { setOpen } = useTeachers()

  return (
    <div className='flex items-center gap-2'>
      <Button onClick={() => setOpen('add')}>
        <Plus className='mr-2 h-4 w-4' />
        {t('teachers.actions.add')}
      </Button>
    </div>
  )
}
