// /routes/_authenticated/teachers/data/teachers.ts

import { faker } from '@faker-js/faker'
import type { Teacher } from './schema'

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
] as const

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
] as const

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
] as const

// ✅ Add 'as const' to maintain exact string literals
const specializations = [
  'quran_memorization',
  'tajweed',
  'islamic_studies',
  'arabic_language',
  'fiqh',
  'hadith',
] as const

const experienceLevels = [
  'less_than_1',
  '1_3_years',
  '3_5_years',
  '5_10_years',
  '10_plus_years',
] as const

const certifications = [
  'Al-Azhar Certification',
  'Islamic University Certification',
  'Ministry of Religious Affairs Certification',
  'International Quran Certification',
  'Tajweed Specialist Certification',
  'None',
] as const

const availabilityOptions = ['full_time', 'part_time', 'weekend_only'] as const

// ✅ Explicitly type the teachers array
export const teachers: Teacher[] = Array.from({ length: 100 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    birthDate: faker.date
      .birthdate({ min: 1970, max: 1995, mode: 'age' })
      .toISOString()
      .split('T')[0],
    gender: faker.helpers.arrayElement(['male', 'female'] as const),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phone: faker.phone.number({ style: 'international' }),
    address: faker.location.streetAddress(),
    city: faker.helpers.arrayElement(cities as unknown as string[]),
    wilaya: faker.helpers.arrayElement(wilayas as unknown as string[]),
    specialization: faker.helpers.arrayElement(specializations),
    assignedHalqas: faker.helpers.arrayElements(halqas as unknown as string[], { min: 1, max: 3 }),
    yearsOfExperience: faker.helpers.arrayElement(experienceLevels),
    certification: faker.helpers.arrayElement(certifications),
    availability: faker.helpers.arrayElement(availabilityOptions),
    notes: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['active', 'inactive', 'on_leave'] as const),
    hireDate: faker.date.past({ years: 10 }),
    updatedAt: faker.date.recent(),
  }
})

// Debug log to verify
console.log(`✅ Generated ${teachers.length} teachers with correct types`)