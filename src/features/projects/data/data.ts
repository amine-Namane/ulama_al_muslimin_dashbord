import { FolderOpen, Clock, Pause, CheckCircle, XCircle } from 'lucide-react'

export type ProjectStatus = 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled'
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent'

export const statusTypes = new Map<ProjectStatus, string>([
  ['planning', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  ['in-progress', 'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200'],
  ['on-hold', 'bg-yellow-100/30 text-yellow-900 dark:text-yellow-200 border-yellow-200'],
  ['completed', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['cancelled', 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'],
])

export const priorityTypes = new Map<ProjectPriority, string>([
  ['low', 'bg-gray-100/30 text-gray-900 dark:text-gray-200 border-gray-200'],
  ['medium', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  ['high', 'bg-orange-100/30 text-orange-900 dark:text-orange-200 border-orange-200'],
  ['urgent', 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
])

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

export const statuses = [
  {
    label: 'Planning',
    value: 'planning',
  },
  {
    label: 'In Progress',
    value: 'in-progress',
  },
  {
    label: 'On Hold',
    value: 'on-hold',
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
export const projectTypes = [
  {
    label: 'Social',
    value: 'social',
  },
  {
    label: 'Economic',
    value: 'economic',
  },
  {
    label: 'Religious',
    value: 'religious',
  },
] as const
export const algerianStates = [
  { value: "adrar", label: "Adrar" },
  { value: "chlef", label: "Chlef" },
  { value: "laghouat", label: "Laghouat" },
  { value: "oum-el-bouaghi", label: "Oum El Bouaghi" },
  { value: "batna", label: "Batna" },
  { value: "béjaïa", label: "Béjaïa" },
  { value: "biskra", label: "Biskra" },
  { value: "béchar", label: "Béchar" },
  { value: "blida", label: "Blida" },
  { value: "bouira", label: "Bouira" },
  { value: "tamanrasset", label: "Tamanrasset" },
  { value: "tébessa", label: "Tébessa" },
  { value: "tlemcen", label: "Tlemcen" },
  { value: "tiaret", label: "Tiaret" },
  { value: "tizi-ouzou", label: "Tizi Ouzou" },
  { value: "algiers", label: "Algiers" },
  { value: "djelfa", label: "Djelfa" },
  { value: "jijel", label: "Jijel" },
  { value: "sétif", label: "Sétif" },
  { value: "saïda", label: "Saïda" },
  { value: "skikda", label: "Skikda" },
  { value: "sidi-bel-abbès", label: "Sidi Bel Abbès" },
  { value: "annaba", label: "Annaba" },
  { value: "guelma", label: "Guelma" },
  { value: "constantine", label: "Constantine" },
  { value: "médéa", label: "Médéa" },
  { value: "mostaganem", label: "Mostaganem" },
  { value: "msila", label: "M'Sila" },
  { value: "mascara", label: "Mascara" },
  { value: "ouargla", label: "Ouargla" },
  { value: "oran", label: "Oran" },
  { value: "el-bayadh", label: "El Bayadh" },
  { value: "illizi", label: "Illizi" },
  { value: "bordj-bou-arreridj", label: "Bordj Bou Arréridj" },
  { value: "boumerdès", label: "Boumerdès" },
  { value: "el-tarf", label: "El Tarf" },
  { value: "tindouf", label: "Tindouf" },
  { value: "tissemsilt", label: "Tissemsilt" },
  { value: "el-oued", label: "El Oued" },
  { value: "khenchela", label: "Khenchela" },
  { value: "souk-ahras", label: "Souk Ahras" },
  { value: "tipaza", label: "Tipaza" },
  { value: "mila", label: "Mila" },
  { value: "ain-defla", label: "Aïn Defla" },
  { value: "naama", label: "Naâma" },
  { value: "ain-temouchent", label: "Aïn Témouchent" },
  { value: "ghardaia", label: "Ghardaïa" },
  { value: "relizane", label: "Relizane" },
]