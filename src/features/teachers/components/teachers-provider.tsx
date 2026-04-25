'use client'

import { create } from 'zustand'
import { type Teacher } from '../data/schema'

interface TeachersState {
  open: 'add' | 'edit' | 'delete' | null
  setOpen: (open: 'add' | 'edit' | 'delete' | null) => void
  currentRow: Teacher | null
  setCurrentRow: (row: Teacher | null) => void
}

export const useTeachers = create<TeachersState>((set) => ({
  open: null,
  setOpen: (open) => set({ open }),
  currentRow: null,
  setCurrentRow: (row) => set({ currentRow: row }),
}))

interface TeachersProviderProps {
  children: React.ReactNode
}

export function TeachersProvider({ children }: TeachersProviderProps) {
  return <>{children}</>
}
