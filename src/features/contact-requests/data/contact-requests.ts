import { faker } from '@faker-js/faker'
faker.seed(12345)

export const contactRequests = Array.from({ length: 200 }, () => {
  const sentDate = faker.date.past({ years: 1 })
  const status = faker.helpers.arrayElement(['new', 'replied', 'closed'] as const)
  
  return {
    id: faker.string.uuid(),
    senderName: faker.person.fullName(),
    email: faker.internet.email(),
    phoneNumber: `0555${faker.string.numeric(6)}`,
    subject: faker.helpers.arrayElement([
      'Donation Inquiry',
      'Support Request',
      'General Question',
      'Technical Issue',
      'Partnership Opportunity',
      'Volunteer Application',
    ]),
    message: faker.lorem.paragraphs({ min: 2, max: 4 }, '\n\n'),
    status,
    sentDate,
    repliedAt: status === 'replied' ? faker.date.between({ from: sentDate, to: new Date() }) : undefined,
    createdAt: sentDate,
    updatedAt: faker.date.recent(),
  }
})