import { type Row } from '@tanstack/react-table'
import { Copy, Edit, Trash, MoreVertical } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Student } from '../data/schema'
import { useStudents } from './students-provider'

type DataTableRowActionsProps = {
  row: Row<Student>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { t } = useTranslation()
  const { setOpen, setCurrentRow } = useStudents()
  const student = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>{t('users.openMenu')}</span>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(student)
            setOpen('edit')
          }}
        >
          <Edit className='mr-2 h-4 w-4' />
          {t('users.edit')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(student)
            setOpen('delete')
          }}
        >
          <Trash className='mr-2 h-4 w-4' />
          {t('users.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
