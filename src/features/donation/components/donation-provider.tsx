import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Donation } from '../data/schema'

type DonationDialogType = 'add' | 'edit' | 'delete' | 'view'

type DonationContextType = {
  open: DonationDialogType | null
  setOpen: (str: DonationDialogType | null) => void
  currentRow: Donation | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Donation | null>>
}

const DonationContext = React.createContext<DonationContextType | null>(null)

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<DonationDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Donation | null>(null)

  return (
    <DonationContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </DonationContext>
  )
}

export const useDonation = () => {
  const donationContext = React.useContext(DonationContext)
  if (!donationContext) {
    throw new Error('useDonation has to be used within <DonationContext>')
  }
  return donationContext
}