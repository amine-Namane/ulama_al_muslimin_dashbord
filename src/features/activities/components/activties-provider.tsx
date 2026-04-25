import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Activity } from '../data/schema'

type ActivityDialogType = 'add' | 'edit' | 'delete'

type ActivitiesContextType = {
  open: ActivityDialogType | null
  setOpen: (str: ActivityDialogType | null) => void
  currentRow: Activity | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Activity | null>>
}

const ActivitiesContext = React.createContext<ActivitiesContextType | null>(null)

export function ActivitiesProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ActivityDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Activity | null>(null)

  return (
    <ActivitiesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ActivitiesContext>
  )
}

export const useActivities = () => {
  const activitiesContext = React.useContext(ActivitiesContext)

  if (!activitiesContext) {
    throw new Error('useActivities has to be used within <ActivitiesContext>')
  }

  return activitiesContext
}