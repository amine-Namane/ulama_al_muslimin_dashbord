
import { faker } from '@faker-js/faker'
import { Role } from './schema'

faker.seed(12345)

const roleTypes = ['system', 'custom', 'temporary'] as const
const availablePermissions = [
  'users:create', 'users:read', 'users:update', 'users:delete',
  'roles:create', 'roles:read', 'roles:update', 'roles:delete',
  'settings:manage', 'reports:view', 'data:export', 'data:import'
]

export const roles: Role[] = Array.from({ length: 50 }, (_, index) => {
  const name = faker.helpers.arrayElement([
    'admin', 'editor', 'viewer', 'moderator', 'contributor',
    'manager', 'analyst', 'support', 'developer', 'designer'
  ]) + (index > 9 ? `_${index}` : '')

  return {
    id: faker.string.uuid(),
    name,
    displayName: faker.helpers.fake('{{person.jobTitle}}'),
    description: faker.lorem.sentence({ min: 8, max: 15 }),
    type: faker.helpers.arrayElement(roleTypes),
    permissions: faker.helpers.arrayElements(availablePermissions, { min: 2, max: 6 }),
    isActive: faker.datatype.boolean(0.8),
    priority: faker.number.int({ min: 1, max: 100 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    usersCount: faker.number.int({ min: 0, max: 100 }),
  }
})
