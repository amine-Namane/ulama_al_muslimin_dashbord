import { faker } from '@faker-js/faker'
faker.seed(67890)

export const projects = Array.from({ length: 100 }, () => {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    slug: faker.lorem.slug(),
     state:faker.location.state() ,
    description: faker.lorem.paragraph(),
    details: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
    owner: faker.person.fullName(),
    status: faker.helpers.arrayElement([
      'planning',
      'in-progress',
      'on-hold',
      'completed',
      'cancelled',
    ]),
    priority: faker.helpers.arrayElement([
      'low',
      'medium',
      'high',
      'urgent',
    ]),
     type :faker.helpers.arrayElement(['Religious', 'Economic', 'Social']),
    budget: faker.number.int({ min: 5000, max: 500000 }),
    estimatedHours: faker.number.int({ min: 20, max: 1000 }),
    tags: faker.helpers.arrayElements([
      'web-development',
      'mobile-app',
      'design',
      'backend',
      'frontend',
      'database',
      'api',
      'ui-ux',
      'testing',
      'deployment',
      'maintenance',
      'research',
    ], { min: 1, max: 4 }),
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
Beneficiaries: faker.number.int({ min: 5, max: 200 }),
     
  }
})
