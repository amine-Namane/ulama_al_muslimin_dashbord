import { BookOpen, GraduationCap, Award, Clock } from 'lucide-react'
import { type TeacherStatus } from './schema'

export const teacherStatuses = new Map<TeacherStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  [
    'on_leave',
    'bg-blue-200/40 text-blue-900 dark:text-blue-100 border-blue-300',
  ],
])

export const specializations = [
  {
    label: 'Quran Memorization',
    value: 'quran_memorization',
    icon: BookOpen,
  },
  {
    label: 'Tajweed',
    value: 'tajweed',
    icon: BookOpen,
  },
  {
    label: 'Islamic Studies',
    value: 'islamic_studies',
    icon: BookOpen,
  },
  {
    label: 'Arabic Language',
    value: 'arabic_language',
    icon: BookOpen,
  },
  {
    label: 'Fiqh',
    value: 'fiqh',
    icon: BookOpen,
  },
  {
    label: 'Hadith',
    value: 'hadith',
    icon: BookOpen,
  },
] as const

export const experienceLevels = [
  {
    label: 'Less than 1 year',
    value: 'less_than_1',
    icon: Clock,
  },
  {
    label: '1-3 years',
    value: '1_3_years',
    icon: Clock,
  },
  {
    label: '3-5 years',
    value: '3_5_years',
    icon: Clock,
  },
  {
    label: '5-10 years',
    value: '5_10_years',
    icon: Clock,
  },
  {
    label: '10+ years',
    value: '10_plus_years',
    icon: Award,
  },
] as const

export const availabilityOptions = [
  {
    label: 'Full Time',
    value: 'full_time',
    icon: Clock,
  },
  {
    label: 'Part Time',
    value: 'part_time',
    icon: Clock,
  },
  {
    label: 'Weekend Only',
    value: 'weekend_only',
    icon: Clock,
  },
] as const

export const wilayas = [
  { label: 'Adrar', value: 'Adrar' },
  { label: 'Ain Defla', value: 'Ain Defla' },
  { label: 'Ain Temouchent', value: 'Ain Temouchent' },
  { label: 'Alger', value: 'Alger' },
  { label: 'Annaba', value: 'Annaba' },
  { label: 'Batna', value: 'Batna' },
  { label: 'Bechar', value: 'Bechar' },
  { label: 'Bejaia', value: 'Bejaia' },
  { label: 'Biskra', value: 'Biskra' },
  { label: 'Blida', value: 'Blida' },
  { label: 'Bordj Bou Arreridj', value: 'Bordj Bou Arreridj' },
  { label: 'Bouira', value: 'Bouira' },
  { label: 'Boumerdes', value: 'Boumerdes' },
  { label: 'Chlef', value: 'Chlef' },
  { label: 'Constantine', value: 'Constantine' },
  { label: 'Djelfa', value: 'Djelfa' },
  { label: 'El Bayadh', value: 'El Bayadh' },
  { label: 'El Oued', value: 'El Oued' },
  { label: 'El Tarf', value: 'El Tarf' },
  { label: 'Ghardaia', value: 'Ghardaia' },
  { label: 'Guelma', value: 'Guelma' },
  { label: 'Illizi', value: 'Illizi' },
  { label: 'Jijel', value: 'Jijel' },
  { label: 'Khenchela', value: 'Khenchela' },
  { label: 'Laghouat', value: 'Laghouat' },
  { label: 'Lemdi', value: 'Lemdi' },
  { label: 'Mascara', value: 'Mascara' },
  { label: 'Medea', value: 'Medea' },
  { label: 'Mila', value: 'Mila' },
  { label: 'Mostaganem', value: 'Mostaganem' },
  { label: 'Naama', value: 'Naama' },
  { label: 'Oran', value: 'Oran' },
  { label: 'Ouargla', value: 'Ouargla' },
  { label: 'Oued', value: 'Oued' },
  { label: 'Relizane', value: 'Relizane' },
  { label: 'Saida', value: 'Saida' },
  { label: 'Setif', value: 'Setif' },
  { label: 'Sidi Bel Abbes', value: 'Sidi Bel Abbes' },
  { label: 'Skikda', value: 'Skikda' },
  { label: 'Souk Ahras', value: 'Souk Ahras' },
  { label: 'Tamanrasset', value: 'Tamanrasset' },
  { label: 'Tebessa', value: 'Tebessa' },
  { label: 'Tiaret', value: 'Tiaret' },
  { label: 'Tindouf', value: 'Tindouf' },
  { label: 'Tipaza', value: 'Tipaza' },
  { label: 'Tissemsilt', value: 'Tissemsilt' },
  { label: 'Tizi Ouzou', value: 'Tizi Ouzou' },
  { label: 'Tlemcen', value: 'Tlemcen' },
] as const

export const cities = [
  { label: 'Algiers', value: 'Algiers' },
  { label: 'Oran', value: 'Oran' },
  { label: 'Constantine', value: 'Constantine' },
  { label: 'Annaba', value: 'Annaba' },
  { label: 'Blida', value: 'Blida' },
  { label: 'Batna', value: 'Batna' },
  { label: 'Khenchela', value: 'Khenchela' },
  { label: 'Biskra', value: 'Biskra' },
  { label: 'Bejaia', value: 'Bejaia' },
  { label: 'Tizi Ouzou', value: 'Tizi Ouzou' },
  { label: 'Setif', value: 'Setif' },
  { label: 'Sidi Bel Abbes', value: 'Sidi Bel Abbes' },
] as const

export const halqas = [
  { label: 'Halqa 1', value: 'Halqa 1' },
  { label: 'Halqa 2', value: 'Halqa 2' },
  { label: 'Halqa 3', value: 'Halqa 3' },
  { label: 'Halqa 4', value: 'Halqa 4' },
  { label: 'Halqa 5', value: 'Halqa 5' },
  { label: 'Halqa 6', value: 'Halqa 6' },
  { label: 'Halqa 7', value: 'Halqa 7' },
  { label: 'Halqa 8', value: 'Halqa 8' },
  { label: 'Halqa 9', value: 'Halqa 9' },
  { label: 'Halqa 10', value: 'Halqa 10' },
] as const
