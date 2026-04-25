import { MailPlus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useActivities } from './activties-provider'
import { useTranslation } from 'react-i18next'

export function UsersPrimaryButtons() {
  const { setOpen } = useActivities()
  const {t}=useTranslation()
  return (
    <div className='flex gap-2'>
      
      <Button className='space-x-1 bg-[#095555]' onClick={() => setOpen('add')}>
        <span> {t("activities.form.addTitle")}</span> 
      </Button>
    </div>
  )
}
