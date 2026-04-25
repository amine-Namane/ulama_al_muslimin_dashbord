import { type Table } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { type Student } from '../data/schema'
import { useStudents } from './students-provider'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData extends Student>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const { t } = useTranslation()
  const { setOpen } = useStudents()

  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='outline'
        size='sm'
        onClick={() => table.toggleAllPageRowsSelected(false)}
        disabled={!table.getIsSomePageRowsSelected()}
        className='h-8'
      >
        {t('users.clearSelection')}
      </Button>
      <Button
        variant='outline'
        size='sm'
        disabled={!table.getIsSomePageRowsSelected()}
        className='h-8'
      >
        {t('users.deleteSelected')} (
        {table.getFilteredSelectedRowModel().rows.length})
      </Button>
    </div>
  )
}
