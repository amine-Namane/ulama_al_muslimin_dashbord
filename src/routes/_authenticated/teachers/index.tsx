import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Teachers } from '@/features/teachers'
import { specializations, experienceLevels } from '@/features/teachers/data/data'

const teachersSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  status: z
    .array(
      z.union([
        z.literal('active'),
        z.literal('inactive'),
        z.literal('on_leave'),
      ])
    )
    .optional()
    .catch([]),
  specialization: z
    .array(
      z.enum(specializations.map((s) => s.value as (typeof specializations)[number]['value']))
    )
    .optional()
    .catch([]),
  yearsOfExperience: z
    .array(
      z.enum(experienceLevels.map((e) => e.value as (typeof experienceLevels)[number]['value']))
    )
    .optional()
    .catch([]),
  // Per-column text filter
  email: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/teachers/')
({
  component: Teachers,
  validateSearch: teachersSearchSchema,
})