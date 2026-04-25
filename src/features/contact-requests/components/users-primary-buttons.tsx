import { MailPlus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContactRequests } from './contact-requests-provider'

export function UsersPrimaryButtons() {
  const { setOpen } = useContactRequests()
  return (
    <div className='flex gap-2'>
      
      <Button className='space-x-1 bg-[#095555]' onClick={() => setOpen('add')}>
        <span>Add Item</span> 
      </Button>
    </div>
  )
}
