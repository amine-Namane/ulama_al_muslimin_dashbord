import { faker } from '@faker-js/faker'

faker.seed(12345)

export const activities = Array.from({ length: 200 }, () => {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 6 }),
    organizer: faker.person.fullName(),
    type: faker.helpers.arrayElement([
      'training',
      'workshop',
      'seminar',
      'conference',
      'sports',
      'cultural',
    ]),
    status: faker.helpers.arrayElement([
      'planned',
      'active',
      'completed',
      'cancelled',
    ]),
    participants: faker.number.int({ min: 5, max: 200 }),
    duration: `${faker.number.int({ min: 1, max: 5 })} days`,
    date: faker.date.future(),
    state: faker.location.state(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
