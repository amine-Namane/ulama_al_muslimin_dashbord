import { faker } from '@faker-js/faker'

faker.seed(67890)

const algerianNames = [
  'أحمد بن علي', 'فاطمة بنت محمد', 'عمر بن عبد الله', 'خديجة بنت يوسف',
  'محمد بن إبراهيم', 'عائشة بنت حسن', 'علي بن عمر', 'زينب بنت أحمد',
  'يوسف بن محمد', 'مريم بنت علي', 'حسن بن يوسف', 'سعاد بنت محمود',
  'إبراهيم بن أحمد', 'نادية بنت عبد الرحمن', 'عبد الله بن علي',
]

export const donations = Array.from({ length: 500 }, (_, index) => {
  const nameIndex = index % algerianNames.length
  const donorName = algerianNames[nameIndex]
  const baseEmail = donorName.split(' ')[0].toLowerCase()
  
  return {
    id: faker.string.uuid(),
    donorName: donorName,
    donorEmail: `${baseEmail.replace(/[أإآ]/g, 'a').replace(/[ة]/g, 'a').replace(/[ي]/g, 'i').replace(/[و]/g, 'o').replace(/[ف]/g, 'f').replace(/[ط]/g, 't').replace(/[م]/g, 'm').replace(/[ح]/g, 'h').replace(/[س]/g, 's').replace(/[ع]/g, 'a').replace(/[د]/g, 'd').replace(/[ن]/g, 'n').replace(/[ل]/g, 'l').replace(/[ر]/g, 'r').replace(/[ب]/g, 'b').replace(/[ج]/g, 'j').replace(/[ز]/g, 'z').replace(/[خ]/g, 'kh').replace(/[ش]/g, 'sh').replace(/[ص]/g, 's').replace(/[ض]/g, 'd').replace(/[غ]/g, 'gh').replace(/[ق]/g, 'q').replace(/[ك]/g, 'k').replace(/[ه]/g, 'h').replace(/[ى]/g, 'y').replace(/[ت]/g, 't').replace(/[ث]/g, 'th').replace(/[ج]/g, 'j').replace(/[ذ]/g, 'dh').replace(/[ظ]/g, 'dh')}@email.com`,
    amount: faker.helpers.arrayElement([
      1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000, 50000, 100000
    ]),
    currency: 'DZD',
    donationType: faker.helpers.arrayElement([
      'general',
      'emergency',
      'education',
      'healthcare',
      'infrastructure',
      'orphan',
      'elderly',
      'food',
    ]),
    paymentMethod: faker.helpers.arrayElement([
      'credit_card',
      'bank_transfer',
      'cash',
      'mobile_payment',
      'check',
    ]),
    status: faker.helpers.arrayElement([
      'completed',
      'pending',
      'failed',
    ]),
    notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
