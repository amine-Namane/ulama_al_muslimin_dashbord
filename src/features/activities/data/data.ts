import { 
  Calendar, 
  Users, 
  Target, 
  Trophy, 
  Heart, 
  BookOpen, 
  Coffee, 
  Music,
  Gamepad2,
  Dumbbell
} from 'lucide-react'

export type ActivityStatus = 'planned' | 'active' | 'completed' | 'cancelled'
export type ActivityPriority = 'low' | 'medium' | 'high' | 'urgent'

export const statusTypes = new Map<ActivityStatus, string>([
  ['planned', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  ['active', 'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200'],
  ['completed', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['cancelled', 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'],
])

export const priorityTypes = new Map<ActivityPriority, string>([
  ['low', 'bg-gray-100/30 text-gray-900 dark:text-gray-200 border-gray-200'],
  ['medium', 'bg-yellow-100/30 text-yellow-900 dark:text-yellow-200 border-yellow-200'],
  ['high', 'bg-orange-100/30 text-orange-900 dark:text-orange-200 border-orange-200'],
  ['urgent', 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
])

export const categories = [
  {
    label: 'Team Building',
    value: 'team-building',
  },
  {
    label: 'Training',
    value: 'training',
  },
  {
    label: 'Social',
    value: 'social',
  },
  {
    label: 'Health & Wellness',
    value: 'health-wellness',
  },
  {
    label: 'Professional Development',
    value: 'professional-development',
  },
  {
    label: 'Recreation',
    value: 'recreation',
  },
  {
    label: 'Community Service',
    value: 'community-service',
  },
  {
    label: 'Cultural',
    value: 'cultural',
  },
  {
    label: 'Sports',
    value: 'sports',
  },
] as const

export const statuses = [
  {
    label: 'Planned',
    value: 'planned',
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
  {
    label: 'Cancelled',
    value: 'cancelled',
  },
] as const

export const priorities = [
  {
    label: 'Low',
    value: 'low',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'High',
    value: 'high',
  },
  {
    label: 'Urgent',
    value: 'urgent',
  },
] as const