'use client'

import { type Table } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { type Teacher } from '../data/schema'

interface DataTableBulkActionsProps<TData> {
  table: Table<TData>
  setRowSelection: (selection: Record<string, boolean>) => void
}

export function DataTableBulkActions({
  table,
  setRowSelection,
}: DataTableBulkActionsProps<Teacher>) {
  const { t } = useTranslation()
  const selectedRows = table.getSelectedRowModel().rows

  if (selectedRows.length === 0) {
    return null
  }

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm text-muted-foreground'>
        {selectedRows.length} {t('users.selected') || 'selected'}
      </span>
      <Button
        variant='ghost'
        size='sm'
        className='text-red-600 hover:text-red-700'
        onClick={() => {
          // Handle bulk delete
          console.log(
            'Delete selected teachers:',
            selectedRows.map((r) => r.original.id)
          )
          setRowSelection({})
        }}
      >
        <Trash2 className='mr-2 h-4 w-4' />
        {t('users.deleteSelected')}
      </Button>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => {
          setRowSelection({})
        }}
      >
        {t('users.clearSelection')}
      </Button>
    </div>
  )
}
