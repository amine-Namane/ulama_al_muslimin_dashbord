import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useStudents } from './students-provider'

export function StudentsPrimaryButtons() {
  const { setOpen } = useStudents()
  const { t } = useTranslation()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1 bg-[#095555]' onClick={() => setOpen('add')}>
        <span>{t('users.userForm.add')}</span>
      </Button>
    </div>
  )
}
