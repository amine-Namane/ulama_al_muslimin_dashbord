import { MailPlus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {  useProjects } from './project-provider'
import { useTranslation } from 'react-i18next'

export function UsersPrimaryButtons() {
  const {t}=useTranslation()
  const { setOpen } =  useProjects()
  return (
    <div className='flex gap-2'>
      
      <Button className='space-x-1 bg-[#095555]' onClick={() => setOpen('add')}>
        <span>{t('projects.project.title')} </span> 
      </Button>
    </div>
  )
}
