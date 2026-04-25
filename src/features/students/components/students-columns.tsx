import { type ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { callTypes, grades } from '../data/data'
import { type Student } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const studentsColumns = (): ColumnDef<Student>[] => {
  const { t } = useTranslation()

  return [
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
      meta: {
        className: cn('sticky md:table-cell start-0 z-10 rounded-tl-[inherit]'),
      },
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
      id: 'fullName',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.name')}
        />
      ),
      cell: ({ row }) => {
        const { firstName, lastName } = row.original
        const fullName = `${firstName} ${lastName}`
        return <LongText className='max-w-36'>{fullName}</LongText>
      },
      meta: { className: 'w-36' },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.email')}
        />
      ),
      cell: ({ row }) => (
        <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.phone')}
        />
      ),
      cell: ({ row }) => <div>{row.getValue('phone')}</div>,
      enableSorting: false,
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('students.gender')} />
      ),
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('gender')}</div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'birthDate',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('students.birthDate')}
        />
      ),
      cell: ({ row }) => <div>{row.getValue('birthDate')}</div>,
      enableSorting: false,
    },
    {
      accessorKey: 'city',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('students.city')} />
      ),
      cell: ({ row }) => <div>{row.getValue('city')}</div>,
      enableSorting: false,
    },
    {
      accessorKey: 'wilaya',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('students.wilaya')} />
      ),
      cell: ({ row }) => <div>{row.getValue('wilaya')}</div>,
      enableSorting: false,
    },
    {
      accessorKey: 'selectedHalqa',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('students.halqa')} />
      ),
      cell: ({ row }) => <div>{row.getValue('selectedHalqa')}</div>,
      enableSorting: false,
    },
    {
      accessorKey: 'memorizedJuz',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('students.memorizedJuz')}
        />
      ),
      cell: ({ row }) => <div>{row.getValue('memorizedJuz')}</div>,
      enableSorting: false,
    },
    {
      accessorKey: 'guardianName',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('students.guardianName')}
        />
      ),
      cell: ({ row }) => <div>{row.getValue('guardianName')}</div>,
      enableSorting: false,
    },
    {
      accessorKey: 'guardianPhone',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('students.guardianPhone')}
        />
      ),
      cell: ({ row }) => <div>{row.getValue('guardianPhone')}</div>,
      enableSorting: false,
    },
    {
      accessorKey: 'grade',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('students.grade')} />
      ),
      cell: ({ row }) => {
        const { grade } = row.original
        const gradeType = grades.find(({ value }) => value === grade)

        if (!gradeType) {
          return null
        }

        return (
          <div className='flex items-center gap-x-2'>
            {gradeType.icon && (
              <gradeType.icon size={16} className='text-muted-foreground' />
            )}
            <span className='text-sm capitalize'>{gradeType.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.status')}
        />
      ),
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge
            variant='outline'
            className={cn('capitalize', callTypes.get(status as any))}
          >
            {status}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} />,
      meta: {
        className: 'sticky md:table-cell end-0 z-10 rounded-tr-[inherit]',
      },
    },
  ]
}
