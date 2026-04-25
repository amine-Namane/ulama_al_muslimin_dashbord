import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type ContactRequest } from '../data/schema'

type ContactDialogType = 'view' | 'reply' | 'delete'

type ContactContextType = {
  open: ContactDialogType | null
  setOpen: (str: ContactDialogType | null) => void
  currentRow: ContactRequest | null
  setCurrentRow: React.Dispatch<React.SetStateAction<ContactRequest | null>>
}

const ContactContext = React.createContext<ContactContextType | null>(null)

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ContactDialogType>(null)
  const [currentRow, setCurrentRow] = useState<ContactRequest | null>(null)

  return (
    <ContactContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ContactContext>
  )
}

export const useContactRequests = () => {
  const contactContext = React.useContext(ContactContext)
  if (!contactContext) {
    throw new Error('useContactRequests has to be used within <ContactContext>')
  }
  return contactContext
}