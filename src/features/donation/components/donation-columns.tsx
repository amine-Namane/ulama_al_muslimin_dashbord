import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Donation } from '../data/schema'
import { DonationTableRowActions } from './data-table-row-actions'
import { statusTypes } from '../data/data'
import { useTranslation } from 'react-i18next'

export const donationColumns=(): ColumnDef<Donation>[] =>{
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
    meta: {
      className: 'w-[50px]',
    },
  },
  {
    id: 'id',
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => (
      <div className="font-mono text-sm">
        {row.index + 1}
      </div>
    ),
    enableSorting: false,
    meta: {
      className: 'w-[60px]',
    },
  },
  {
    accessorKey: 'donorName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('donations.columns.donor')} />
    ),
    cell: ({ row }) => {
      const donorName = row.getValue('donorName') as string
      const donorEmail = row.original.donorEmail
      return (
        <div className='max-w-[200px]'>
          <div className='font-medium truncate'>{donorName}</div>
          <div className='text-xs text-muted-foreground truncate'>
            {donorEmail}
          </div>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: 'min-w-[180px]',
    },
  },
  {
    accessorKey: 'donationType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('donations.columns.donationsType')} />
    ),
    cell: ({ row }) => {
      const donationType = row.getValue('donationType') as string
      return (
        <Badge variant='outline' className='capitalize'>
          {donationType}
        </Badge>
      )
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    meta: {
      className: 'min-w-[120px]',
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('donations.columns.amount')} />
    ),
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      const currency = row.original.currency
      return (
        <div className='font-mono font-medium text-green-600'>
          {amount.toLocaleString()} {currency}
        </div>
      )
    },
    enableSorting: true,
    meta: {
      className: 'min-w-[120px]',
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('donations.columns.paymentMethod')} />
    ),
    cell: ({ row }) => {
      const paymentMethod = row.getValue('paymentMethod') as string
      return (
        <div className='capitalize'>
          {paymentMethod}
        </div>
      )
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    meta: {
      className: 'min-w-[130px]',
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('donations.columns.date')} />
    ),
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      return (
        <div className='text-sm'>
          {format(date, 'yyyy-MM-dd')}
        </div>
      )
    },
    enableSorting: true,
    meta: {
      className: 'min-w-[100px]',
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('donations.columns.status')} />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusClass = statusTypes.get(status as any) || ''
      
      return (
        <Badge 
          variant='outline'
          className={`capitalize ${statusClass}`}
        >
          {status}
        </Badge>
      )
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    meta: {
      className: 'min-w-[100px]',
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <DonationTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: 'w-[60px]',
    },
  },
]}