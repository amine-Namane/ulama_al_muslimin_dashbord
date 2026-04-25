// roles-provider.tsx
import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Role } from '../data/schema'

type RoleDialogType = 'add' | 'edit' | 'delete'

type RoleContextType = {
  open: RoleDialogType | null
  setOpen: (str: RoleDialogType | null) => void
  currentRow: Role | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Role | null>>
}

const RoleContext = React.createContext<RoleContextType | null>(null)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<RoleDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Role | null>(null)

  return (
    <RoleContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </RoleContext.Provider>
  )
}

export const useRoles = () => {
  const roleContext = React.useContext(RoleContext)

  if (!roleContext) {
    throw new Error('useRoles has to be used within <RoleProvider>')
  }

  return roleContext
}