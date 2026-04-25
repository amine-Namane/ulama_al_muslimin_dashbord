import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Students } from '@/features/students'
import { grades } from '@/features/students/data/data'

const studentsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  status: z
    .array(
      z.union([
        z.literal('active'),
        z.literal('inactive'),
        z.literal('graduated'),
        z.literal('suspended'),
      ])
    )
    .optional()
    .catch([]),
  grade: z
    .array(
      z.enum(grades.map((g) => g.value as (typeof grades)[number]['value']))
    )
    .optional()
    .catch([]),
  // Per-column text filter
  email: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/students/')({
  validateSearch: studentsSearchSchema,
  component: Students,
})
