import { CreditCard, Banknote, Smartphone, Building } from 'lucide-react'

// Define DonationStatus type manually
export type DonationStatus = 'completed' | 'pending' | 'failed'

export const statusTypes = new Map<DonationStatus, string>([
  ['completed', 'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200'],
  ['pending', 'bg-yellow-100/30 text-yellow-900 dark:text-yellow-200 border-yellow-200'],
  ['failed', 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
])

export const donationTypes = [
  {
    label: 'General Fund',
    value: 'general',
  },
  {
    label: 'Emergency Relief',
    value: 'emergency',
  },
  {
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Healthcare',
    value: 'healthcare',
  },
  {
    label: 'Infrastructure',
    value: 'infrastructure',
  },
  {
    label: 'Orphan Support',
    value: 'orphan',
  },
  {
    label: 'Elderly Care',
    value: 'elderly',
  },
  {
    label: 'Food Aid',
    value: 'food',
  },
] as const

export const paymentMethods = [
  {
    label: 'Credit Card',
    value: 'credit_card',
  },
  {
    label: 'Bank Transfer',
    value: 'bank_transfer',
  },
  {
    label: 'Cash',
    value: 'cash',
  },
  {
    label: 'Mobile Payment',
    value: 'mobile_payment',
  },
  {
    label: 'Check',
    value: 'check',
  },
] as const

export const statuses = [
  {
    label: 'Completed',
    value: 'completed',
  },
  {
    label: 'Pending Verification',
    value: 'pending',
  },
  {
    label: 'Failed',
    value: 'failed',
  },
] as const
