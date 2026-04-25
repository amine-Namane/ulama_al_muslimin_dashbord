 import { MailPlus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRoles } from './roles-provider'
import { useTranslation } from 'react-i18next'

export function UsersPrimaryButtons() {
  const {t}=useTranslation()
  const { setOpen } = useRoles()
  return (
    <div className='flex gap-2'>
      
      <Button className='space-x-1 bg-[#095555]' onClick={() => setOpen('add')}>
        <span>          {t("roles.form.addButton")}
</span> 
      </Button>
    </div>
  )
}
