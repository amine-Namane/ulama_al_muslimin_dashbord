import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(12345)

const wilayas = [
  'Adrar',
  'Ain Defla',
  'Ain Temouchent',
  'Alger',
  'Annaba',
  'Batna',
  'Bechar',
  'Bejaia',
  'Biskra',
  'Blida',
  'Bordj Bou Arreridj',
  'Bouira',
  'Boumerdes',
  'Chlef',
  'Constantine',
  'Djelfa',
  'El Bayadh',
  'El Oued',
  'El Tarf',
  'Ghardaia',
  'Guelma',
  'Illizi',
  'Jijel',
  'Khenchela',
  'Laghouat',
  'Lemdi',
  'Mascara',
  'Medea',
  'Mila',
  'Mostaganem',
  'Naama',
  'Oran',
  'Ouargla',
  'Oued',
  'Relizane',
  'Saida',
  'Setif',
  'Sidi Bel Abbes',
  'Skikda',
  'Souk Ahras',
  'Tamanrasset',
  'Tebessa',
  'Tiaret',
  'Tindouf',
  'Tipaza',
  'Tissemsilt',
  'Tizi Ouzou',
  'Tlemcen',
]

const cities = [
  'Algiers',
  'Oran',
  'Constantine',
  'Annaba',
  'Blida',
  'Batna',
  'Khenchela',
  'Biskra',
  'Bejaia',
  'Tizi Ouzou',
  'Setif',
  'Sidi Bel Abbes',
]

const halqas = [
  'Halqa 1',
  'Halqa 2',
  'Halqa 3',
  'Halqa 4',
  'Halqa 5',
  'Halqa 6',
  'Halqa 7',
  'Halqa 8',
  'Halqa 9',
  'Halqa 10',
]

const JuzOptions = [
  'Juz 1',
  'Juz 2',
  'Juz 3',
  'Juz 4',
  'Juz 5',
  'Juz 1-5',
  'Juz 1-10',
  'Juz 1-15',
  'Juz 1-20',
  'Juz 1-30',
]

export const students = Array.from({ length: 500 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    birthDate: faker.date
      .birthdate({ min: 2000, max: 2015, mode: 'age' })
      .toISOString()
      .split('T')[0],
    gender: faker.helpers.arrayElement(['male', 'female']),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    phone: faker.phone.number({ style: 'international' }),
    address: faker.location.streetAddress(),
    city: faker.helpers.arrayElement(cities),
    wilaya: faker.helpers.arrayElement(wilayas),
    selectedHalqa: faker.helpers.arrayElement(halqas),
    memorizedJuz: faker.helpers.arrayElement(JuzOptions),
    previousExperience: faker.helpers.arrayElement([
      'None',
      '1 year',
      '2 years',
      '3 years',
      '4+ years',
    ]),
    learningGoals: faker.helpers.arrayElement([
      'Memorize Quran',
      ' Tajweed',
      'Islamic studies',
      'Both',
    ]),
    guardianName: faker.person.fullName(),
    guardianPhone: faker.phone.number({ style: 'international' }),
    grade: faker.helpers.arrayElement([
      'grade1',
      'grade2',
      'grade3',
      'grade4',
      'grade5',
    ]),
    status: faker.helpers.arrayElement([
      'active',
      'inactive',
      'graduated',
      'suspended',
    ]),
    enrollmentDate: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
