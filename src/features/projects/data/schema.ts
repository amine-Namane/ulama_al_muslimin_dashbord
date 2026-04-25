import { z } from 'zod'

const projectStatusSchema = z.union([
  z.literal('planning'),
  z.literal('in-progress'),
  z.literal('on-hold'),
  z.literal('completed'),
  z.literal('cancelled'),
])
export type ProjectStatus = z.infer<typeof projectStatusSchema>

const projectPrioritySchema = z.union([
  z.literal('low'),
  z.literal('medium'),
  z.literal('high'),
  z.literal('urgent'),
])
export type ProjectPriority = z.infer<typeof projectPrioritySchema>

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  details: z.string(),
  owner: z.string(),
  priority: projectPrioritySchema,
  status: projectStatusSchema,
  tags: z.array(z.string()).optional(),
  budget: z.number().optional(),
  Beneficiaries:z.number().optional(),
  estimatedHours: z.number().optional(),
  // startDate: z.coerce.date().optional(),
  // endDate: z.coerce.date().optional(),
   type: projectPrioritySchema,
    state: z.string().min(1, 'State is required.'),
  startDate: z.coerce.date(),
  endDat: z.coerce.date(),
})
export type Project = z.infer<typeof projectSchema>

export const projectListSchema = z.array(projectSchema)