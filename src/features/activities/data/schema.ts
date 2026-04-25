import { z } from 'zod'

export const activityStatusSchema = z.union([
  z.literal('planned'),
  z.literal('active'),
  z.literal('completed'),
  z.literal('cancelled'),
])
export type ActivityStatus = z.infer<typeof activityStatusSchema>

const activityTypeSchema = z.union([
  z.literal('training'),
  z.literal('workshop'),
  z.literal('seminar'),
  z.literal('conference'),
  z.literal('sports'),
  z.literal('cultural'),
])

const activitySchema = z.object({
  id: z.string(),
  title: z.string(),          // Activity
  organizer: z.string(),      // Organizer
  type: activityTypeSchema,   // Type
  status: activityStatusSchema, // Status
  participants: z.number().optional(), // Participants
  duration: z.string().optional(),     // Duration (e.g. "2h", "3 days")
  date: z.coerce.date(),               // Date
  state: z.string(),                   // State (wilaya)
  category:z.string(),  
  branch:z.string(),
  startDate:z.string(),
  createdAt: z.coerce.date(),
  endDate:z.number(),
  updatedAt: z.coerce.date(),
})
export type Activity = z.infer<typeof activitySchema>

export const activitiesListSchema = z.array(activitySchema)
