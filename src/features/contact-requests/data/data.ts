import { faker } from '@faker-js/faker'

export type ContactStatus = 'new' | 'replied' | 'closed'

export const statusTypes = new Map<ContactStatus, string>([
  ['new', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  ['replied', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['closed', 'bg-gray-100/30 text-gray-900 dark:text-gray-200 border-gray-200'],
])

export const statuses = [
  { label: 'New', value: 'new' },
  { label: 'Replied', value: 'replied' },
  { label: 'Closed', value: 'closed' },
] as const

export const subjects = [
  { label: 'Donation Inquiry', value: 'donation-inquiry' },
  { label: 'Support Request', value: 'support-request' },
  { label: 'General Question', value: 'general-question' },
  { label: 'Technical Issue', value: 'technical-issue' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Volunteer', value: 'volunteer' },
] as const
