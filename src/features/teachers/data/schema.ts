import { z } from 'zod'

const teacherStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('on_leave'),
])
export type TeacherStatus = z.infer<typeof teacherStatusSchema>

const teacherSpecializationSchema = z.union([
  z.literal('quran_memorization'),
  z.literal('tajweed'),
  z.literal('islamic_studies'),
  z.literal('arabic_language'),
  z.literal('fiqh'),
  z.literal('hadith'),
])

const genderSchema = z.union([z.literal('male'), z.literal('female')])

const teacherSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().optional(),
  gender: genderSchema.optional(),
  email: z.string(),
  phone: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  wilaya: z.string().optional(),
  specialization: teacherSpecializationSchema.optional(),
  assignedHalqas: z.array(z.string()).optional(),
  yearsOfExperience: z.string().optional(),
  certification: z.string().optional(),
  availability: z.string().optional(),
  notes: z.string().optional(),
  status: teacherStatusSchema,
  hireDate: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Teacher = z.infer<typeof teacherSchema>

export const teacherListSchema = z.array(teacherSchema)
