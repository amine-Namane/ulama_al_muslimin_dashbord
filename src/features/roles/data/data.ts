
import { RoleType } from './schema'

export const roleTypeMap = new Map<RoleType, string>([
  ['system', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  ['custom', 'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200'],
  ['temporary', 'bg-yellow-100/30 text-yellow-900 dark:text-yellow-200 border-yellow-200'],
])

export const roleTypes = [
  { label: 'System', value: 'system' },
  { label: 'Custom', value: 'custom' },
  { label: 'Temporary', value: 'temporary' },
] as const

export const permissions = [
  { label: 'Create Users', value: 'users:create' },
  { label: 'Read Users', value: 'users:read' },
  { label: 'Update Users', value: 'users:update' },
  { label: 'Delete Users', value: 'users:delete' },
  { label: 'Create Roles', value: 'roles:create' },
  { label: 'Read Roles', value: 'roles:read' },
  { label: 'Update Roles', value: 'roles:update' },
  { label: 'Delete Roles', value: 'roles:delete' },
  { label: 'Manage Settings', value: 'settings:manage' },
  { label: 'View Reports', value: 'reports:view' },
  { label: 'Export Data', value: 'data:export' },
  { label: 'Import Data', value: 'data:import' },
] as const
