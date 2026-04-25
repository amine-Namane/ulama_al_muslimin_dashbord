import { type Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Teacher } from '../data/schema'
import { useTeachers } from './teachers-provider' // ✅ FIX

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps<Teacher>) {
  const { t } = useTranslation()
  const { setOpen, setCurrentRow } = useTeachers()

  const teacher = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(teacher)
            setOpen('edit') // ✅ FIX
          }}
        >
          {t('teachers.actions.view')}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(teacher)
            setOpen('edit') // ✅ FIX
          }}
        >
          {t('users.edit')}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(teacher)
            setOpen('delete') // ✅ FIX
          }}
          className='text-red-600'
        >
          {t('users.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}