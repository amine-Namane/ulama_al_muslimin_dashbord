// teachersColumns.tsx
import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Teacher } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

// Helper function to format specialization keys to readable text
const formatSpecialization = (spec: string): string => {
  const specMap: Record<string, string> = {
    quran_memorization: 'Quran Memorization',
    tajweed: 'Tajweed',
    islamic_studies: 'Islamic Studies',
    arabic_language: 'Arabic Language',
    fiqh: 'Fiqh',
    hadith: 'Hadith',
  }
  return specMap[spec] || spec
}

// Helper function to format experience level
const formatExperience = (exp: string): string => {
  const expMap: Record<string, string> = {
    less_than_1: '< 1 year',
    '1_3_years': '1-3 years',
    '3_5_years': '3-5 years',
    '5_10_years': '5-10 years',
    '10_plus_years': '10+ years',
  }
  return expMap[exp] || exp
}

// Helper function to format availability
const formatAvailability = (availability: string): string => {
  const availMap: Record<string, string> = {
    full_time: 'Full Time',
    part_time: 'Part Time',
    weekend_only: 'Weekend Only',
  }
  return availMap[availability] || availability
}

// Accept t as a parameter instead of calling useTranslation inside
export const teachersColumns = (t: any): ColumnDef<Teacher>[] => {
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
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      id: 'fullName',
      accessorKey: 'firstName', // This helps with sorting
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.name') || 'Full Name'}
        />
      ),
      cell: ({ row }) => {
        const { firstName, lastName } = row.original
        return <LongText>{`${firstName || ''} ${lastName || ''}`}</LongText>
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.email') || 'Email'}
        />
      ),
      cell: ({ row }) => {
        const email = row.getValue('email') as string
        return (
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
            {email}
          </a>
        )
      },
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => {
        const phone = row.getValue('phone') as string
        return <span className="font-mono text-sm">{phone}</span>
      },
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gender" />
      ),
      cell: ({ row }) => {
        const gender = row.getValue('gender') as string
        return (
          <Badge variant="outline" className="capitalize">
            {gender}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'specialization',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Specialization" />
      ),
      cell: ({ row }) => {
        const spec = row.getValue('specialization') as string
        return <Badge variant="secondary">{formatSpecialization(spec)}</Badge>
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'assignedHalqas',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assigned Halqas" />
      ),
      cell: ({ row }) => {
        const halqas = row.original.assignedHalqas
        if (!halqas || halqas.length === 0) return <span>-</span>
        return (
          <div className="flex flex-wrap gap-1">
            {halqas.slice(0, 2).map((halqa) => (
              <Badge key={halqa} variant="outline" className="text-xs">
                {halqa}
              </Badge>
            ))}
            {halqas.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{halqas.length - 2}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'yearsOfExperience',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Experience" />
      ),
      cell: ({ row }) => {
        const exp = row.getValue('yearsOfExperience') as string
        return <span>{formatExperience(exp)}</span>
      },
    },
    {
      accessorKey: 'certification',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Certification" />
      ),
      cell: ({ row }) => {
        const cert = row.getValue('certification') as string
        if (cert === 'None') return <span className="text-muted-foreground">-</span>
        return (
          <Badge variant="default" className="bg-purple-100 text-purple-800">
            {cert}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'availability',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Availability" />
      ),
      cell: ({ row }) => {
        const availability = row.getValue('availability') as string
        const availabilityColors = {
          full_time: 'bg-green-100 text-green-800',
          part_time: 'bg-blue-100 text-blue-800',
          weekend_only: 'bg-yellow-100 text-yellow-800',
        }
        return (
          <Badge className={availabilityColors[availability as keyof typeof availabilityColors]}>
            {formatAvailability(availability)}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'city',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="City" />
      ),
      cell: ({ row }) => {
        const city = row.getValue('city') as string
        return <span>{city || '-'}</span>
      },
    },
    {
      accessorKey: 'wilaya',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Wilaya" />
      ),
      cell: ({ row }) => {
        const wilaya = row.getValue('wilaya') as string
        return <span>{wilaya || '-'}</span>
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('users.columns.status') || 'Status'}
        />
      ),
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const statusConfig = {
          active: { color: 'bg-green-100 text-green-800', label: 'Active' },
          inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' },
          on_leave: { color: 'bg-yellow-100 text-yellow-800', label: 'On Leave' },
        }
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
        
        return (
          <Badge className={config.color}>
            {config.label}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'hireDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hire Date" />
      ),
      cell: ({ row }) => {
        const hireDate = row.getValue('hireDate') as Date
        return <span>{new Date(hireDate).toLocaleDateString()}</span>
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ]
}