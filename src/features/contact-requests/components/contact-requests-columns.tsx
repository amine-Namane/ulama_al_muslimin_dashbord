import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { ContactTableRowActions } from './data-table-row-actions'
import { statusTypes, type ContactStatus } from '../data/data'
import { type ContactRequest } from '../data/schema'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

export const contactColumns=(): ColumnDef<ContactRequest>[] => {
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
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'senderName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('contacts.columns.senderName')} />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate font-medium">
        {row.getValue('senderName')}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('contacts.columns.email')} />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue('email')}
      </div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('contacts.columns.phone')} />
    ),
    cell: ({ row }) => (
      <div className="font-mono text-sm">
        {row.getValue('phoneNumber')}
      </div>
    ),
  },
  {
    accessorKey: 'subject',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('contacts.columns.subject')} />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        {row.getValue('subject')}
      </div>
    ),
  },
  {
    accessorKey: 'sentDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('contacts.columns.sentDate')} />
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        {format(new Date(row.getValue('sentDate')), 'MMM dd, yyyy')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('contacts.columns.status')} />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as ContactStatus
      return (
        <Badge variant="outline" className={statusTypes.get(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ContactTableRowActions row={row} />,
  },
]}