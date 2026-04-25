import { z } from 'zod'

const contactStatusSchema = z.union([
  z.literal('new'),
  z.literal('replied'),
  z.literal('closed'),
])

export type ContactStatus = z.infer<typeof contactStatusSchema>

const contactRequestSchema = z.object({
  id: z.string(),
  senderName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  subject: z.string(),
  message: z.string(),
  status: contactStatusSchema,
  sentDate: z.coerce.date(),
  repliedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ContactRequest = z.infer<typeof contactRequestSchema>
export const contactRequestListSchema = z.array(contactRequestSchema)
