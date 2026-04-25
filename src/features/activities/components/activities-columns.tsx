
import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { statusTypes, priorityTypes } from '../data/data'
import { type Activity } from '../data/schema'
import { ActivitiesTableRowActions } from './data-table-row-actions'
import { useTranslation } from 'react-i18next'

export const activitiesColumns=(): ColumnDef<Activity>[] =>{
      const { t } = useTranslation() 

  return[
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('activities.columns.activity')} />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31.25rem]'>
        {row.getValue('title')}
      </span>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('activities.columns.type')} />
    ),
    cell: ({ row }) => (
      <Badge variant='outline' className='capitalize'>
        {row.getValue('type')}
      </Badge>
    ),
  },
   {
    accessorKey: 'state',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('activities.columns.state')} />
    ),
    cell: ({ row }) => (
      <span className='text-muted-foreground capitalize'>
        {row.getValue('state')}
      </span>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('activities.columns.date')} />
    ),
    cell: ({ row }) => (
      <span className='text-muted-foreground'>
        {new Date(row.getValue('date')).toLocaleDateString()}
      </span>
    ),
  },
   {
    accessorKey: 'duration',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('activities.columns.duration')} />
    ),
    cell: ({ row }) => (
      <span className='text-muted-foreground'>
        {row.getValue('duration') ?? '-'}
      </span>
    ),
  },
   {
    accessorKey: 'participants',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('activities.columns.participants')} />
    ),
    cell: ({ row }) => (
      <span className='text-muted-foreground'>
        {row.getValue('participants') ?? '-'}
      </span>
    ),
  },
 
  {
    accessorKey: 'organizer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('activities.columns.organizer')} />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium'>
        {row.getValue('organizer')}
      </span>
    ),
  },
  
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('activities.columns.status')} />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusClass = statusTypes.get(status as any) || ''
      return (
        <Badge className={`capitalize ${statusClass}`} variant='outline'>
          {status}
        </Badge>
      )
    },
  },
 
 
  
 
  {
    id: 'actions',
    header: () => <span>Actions</span>,
    cell: ({ row }) => <ActivitiesTableRowActions row={row} />,
  },
]
}