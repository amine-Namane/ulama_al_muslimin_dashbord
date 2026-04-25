import { createFileRoute } from '@tanstack/react-router'
import { Donations } from '@/features/donation'

export const Route = createFileRoute('/_authenticated/donation/')({
  component: Donations,
})


