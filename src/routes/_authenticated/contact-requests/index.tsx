import { createFileRoute } from '@tanstack/react-router'
import {Contacts} from '@/features/contact-requests'

export const Route = createFileRoute('/_authenticated/contact-requests/')({
  component: Contacts,
})


