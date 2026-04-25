import { BookOpen, Users, GraduationCap, AlertCircle } from 'lucide-react'
import { type StudentStatus } from './schema'

export const callTypes = new Map<StudentStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  [
    'graduated',
    'bg-green-200/40 text-green-900 dark:text-green-100 border-green-300',
  ],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const grades = [
  {
    label: 'Grade 1',
    value: 'grade1',
    icon: BookOpen,
  },
  {
    label: 'Grade 2',
    value: 'grade2',
    icon: BookOpen,
  },
  {
    label: 'Grade 3',
    value: 'grade3',
    icon: BookOpen,
  },
  {
    label: 'Grade 4',
    value: 'grade4',
    icon: GraduationCap,
  },
  {
    label: 'Grade 5',
    value: 'grade5',
    icon: GraduationCap,
  },
] as const
