import { useEffect, useState } from 'react'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { type NavigateFn, useTableUrlState } from '@/hooks/use-table-url-state'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
// import { roleTypes } from '../data/data'
import { type Role } from '../data/schema'
import { DataTableBulkActions } from '@/features/users/components/data-table-bulk-actions'
import { rolesColumns as columns, rolesColumns } from './roles-columns'
import { RoleProvider } from './roles-provider' // Import the RoleProvider
import { useTranslation } from "react-i18next"

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className: string
  }
}

type DataTableProps = {
  data: Role[]
  search: Record<string, unknown>
  navigate: NavigateFn
}

export function RolesTable({ data, search, navigate }: DataTableProps) {
    const { t } = useTranslation()
      const columns = rolesColumns()
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const {
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search,
    navigate,
    pagination: { defaultPage: 1, defaultPageSize: 10 },
    globalFilter: { enabled: false },
    columnFilters: [
      { columnId: 'roleName', searchKey: 'roleName', type: 'string' },
      // { columnId: 'isActive', searchKey: 'status', type: 'array' },
      // { columnId: 'type', searchKey: 'type', type: 'array' },
    ],
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    enableRowSelection: true,
    onPaginationChange,
    onColumnFiltersChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useEffect(() => {
    ensurePageInRange(table.getPageCount())
  }, [table, ensurePageInRange])

  return (
    <RoleProvider> 
      <div className='space-y-4 max-sm:has-[div[role="toolbar"]]:mb-16'>
        <DataTableToolbar
          table={table}
          searchPlaceholder={t('roles.actions.filter')}
          searchKey='roleName'
          filters={[
            // {
            //   columnId: 'isActive',
            //   title: 'Status',
            //   options: [
            //     { label: 'Active', value: 'true' },
            //     { label: 'Inactive', value: 'false' },
            //   ],
            // },
            // {
            //   columnId: 'type',
            //   title: 'Type',
            //   options: roleTypes.map((type) => ({ ...type })),
            // },
          ]}
        />
        <div className='overflow-hidden rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='group/row'>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn(
                          'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                          header.column.columnDef.meta?.className ?? ''
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {/* {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='group/row'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                          cell.column.columnDef.meta?.className ?? ''
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )} */}
              {table.getRowModel().rows?.length ? (
  table.getRowModel().rows.map((row) => (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={columns.length} className='h-24 text-center'>
      No results.
    </TableCell>
  </TableRow>
)}

            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
        <DataTableBulkActions table={table} />
      </div>
    </RoleProvider>
  )
}