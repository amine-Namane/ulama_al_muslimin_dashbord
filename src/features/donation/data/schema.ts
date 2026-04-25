import { z } from 'zod'

const donationStatusSchema = z.union([
  z.literal('completed'),
  z.literal('pending'),
  z.literal('failed'),
])

export type DonationStatus = z.infer<typeof donationStatusSchema>

const donationTypeSchema = z.union([
  z.literal('general'),
  z.literal('emergency'),
  z.literal('education'),
  z.literal('healthcare'),
  z.literal('infrastructure'),
  z.literal('orphan'),
  z.literal('elderly'),
  z.literal('food'),
])

const paymentMethodSchema = z.union([
  z.literal('credit_card'),
  z.literal('bank_transfer'),
  z.literal('cash'),
  z.literal('mobile_payment'),
  z.literal('check'),
])

const donationSchema = z.object({
  id: z.string(),
  donorName: z.string(),
  donorEmail: z.string().email(),
  amount: z.number().positive(),
  currency: z.string().default('DZD'),
  donationType: donationTypeSchema,
  paymentMethod: paymentMethodSchema,
  status: donationStatusSchema,
  notes: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Donation = z.infer<typeof donationSchema>

export const donationListSchema = z.array(donationSchema)
