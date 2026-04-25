
import { z } from 'zod'

export const roleTypeSchema = z.enum(['system', 'custom', 'temporary'])
export type RoleType = z.infer<typeof roleTypeSchema>

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  displayName: z.string(),
  description: z.string(),
  type: roleTypeSchema,
  permissions: z.array(z.string()),
  isActive: z.boolean(),
  priority: z.coerce.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  usersCount: z.coerce.number(),
})
export type Role = z.infer<typeof roleSchema>

export const roleListSchema = z.array(roleSchema)
