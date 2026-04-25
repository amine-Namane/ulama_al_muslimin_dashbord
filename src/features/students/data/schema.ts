import { z } from 'zod'

const studentStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('graduated'),
  z.literal('suspended'),
])
export type StudentStatus = z.infer<typeof studentStatusSchema>

const studentGradeSchema = z.union([
  z.literal('grade1'),
  z.literal('grade2'),
  z.literal('grade3'),
  z.literal('grade4'),
  z.literal('grade5'),
])

const genderSchema = z.union([z.literal('male'), z.literal('female')])

const studentSchema = z.object({
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
  selectedHalqa: z.string().optional(),
  memorizedJuz: z.string().optional(),
  previousExperience: z.string().optional(),
  learningGoals: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  grade: studentGradeSchema,
  status: studentStatusSchema,
  enrollmentDate: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Student = z.infer<typeof studentSchema>

export const studentListSchema = z.array(studentSchema)
