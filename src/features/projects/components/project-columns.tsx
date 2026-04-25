// project-columns.tsx
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Project } from '../data/schema'
import { priorityTypes, statusTypes } from '../data/data'
import { ProjectTableRowActions } from './data-table-row-actions'
import { useTranslation } from 'react-i18next'

export const projectColumns=(): ColumnDef<Project>[] => {
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('projects.columns.name')} />
    ),
    cell: ({ row }) => {
      const project = row.original
      return (
        <div className="flex flex-col">
          <div className="font-medium">{project.name}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title={t("projects.columns.type")} />,
    cell: ({ row }) => <Badge variant="outline">{row.getValue('type')}</Badge>,
  },
   {
    accessorKey: 'state',
    header: ({ column }) => <DataTableColumnHeader column={column} title={t("projects.columns.state")} />,
  },
  {
    accessorKey: 'startDate', 
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("projects.columns.startDate")} />
    ),
    cell: ({ row }) => {
      const date = row.getValue('startDate') as Date | undefined
      if (!date) return <span className="text-muted-foreground">-</span>
      
      return (
        <div className="text-sm">
          {date.toLocaleDateString()}
        </div>
      )
    },
  },
   {
    accessorKey: 'endDate', 
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("projects.columns.endDate")} />
    ),
    cell: ({ row }) => {
      const date = row.getValue('endDate') as Date | undefined
      if (!date) return <span className="text-muted-foreground">-</span>
      
      return (
        <div className="text-sm">
          {date.toLocaleDateString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'budget',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("projects.columns.budget")} />
    ),
    cell: ({ row }) => {
      const budget = row.getValue('budget') as number
      if (!budget) return <span className="text-muted-foreground">-</span>
      
      return (
        <div className="font-medium">
          ${budget.toLocaleString()}
        </div>
      )
    },
  }, 
    {
    accessorKey: 'Beneficiaries',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("projects.columns.beneficiaries")} />
    ),
    cell: ({ row }) => {
      const familyCount = row.getValue('Beneficiaries') as number
      if (!familyCount) return <span className="text-muted-foreground">-</span>
      
      return (
        <div className="font-medium text-center">
          {familyCount.toLocaleString()} families
        </div>
      )
    },
  },
{
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("projects.columns.status")} />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as Project['status']
      const statusStyle = statusTypes.get(status)

      return (
        <Badge
          variant="outline"
          className={`capitalize ${statusStyle}`}
        >
          {status.replace('-', ' ')}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ProjectTableRowActions row={row} />,
    meta: {
      className: 'w-[40px]',
    },
  },
]}