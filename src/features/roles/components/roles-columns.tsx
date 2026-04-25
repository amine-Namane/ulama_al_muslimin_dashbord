import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Role } from '../data/schema'
import { RolesTableRowActions } from './data-table-row-actions'
import { permissions as allPermissions } from '../data/data' 
// import { roleTypeMap } from '../data/data'
import { useTranslation } from 'react-i18next'

export const rolesColumns=(): ColumnDef<Role>[] => {
      const { t } = useTranslation() 

  return[
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: 'priority',
    header: ({ column }) => <DataTableColumnHeader column={column} title={t('roles.columns.priority')} />,
    cell: ({ row }) => <div className='w-16'>{row.getValue('priority')}</div>,
  },
  {
    accessorKey: 'roleName',
    header: ({ column }) => <DataTableColumnHeader column={column} title={t('roles.columns.roleName')} />,
    cell: ({ row }) => <div className='font-medium'>{row.getValue('roleName')}</div>,
  },
  {
  accessorKey: 'usersCount',
  header: ({ column }) => <DataTableColumnHeader column={column} title={t('roles.columns.users')} />,
  cell: ({ row }) => (
    <div className='w-16 text-center'>{row.getValue('usersCount')}</div>
  ),
},

  {
  accessorKey: 'permissions',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={t('roles.columns.permissions')} />
  ),
  cell: ({ row }) => {
    // Get the permissions array safely
    const permissions = (row.getValue('permissions') as any[]) ?? []

    // Create readable labels
    const labels = permissions.map((perm) => `${perm.module}:${perm.action}`)

    return (
      <div className="flex flex-wrap gap-1 max-w-48">
        {labels.length > 0 ? (
          labels.map((label) => (
            <span
              key={label}
              className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 px-2 py-0.5 rounded-full text-xs"
            >
              {label}
            </span>
          ))
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        )}
      </div>
    )
  },
  enableSorting: false,
}
,
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title={t('roles.columns.lastUpdated')} />,
    cell: ({ row }) => (
      <div className='w-36'>{new Date(row.getValue('updatedAt')).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: 'Action',
    id: 'actions',
    cell: ({ row }) => <RolesTableRowActions row={row} />,
    meta: { className: 'w-[50px]' },
  },
]}
