import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Project } from '../data/schema'

type ProjectDialogType = 'add' | 'edit' | 'delete'

type ProjectContextType = {
  open: ProjectDialogType | null
  setOpen: (str: ProjectDialogType | null) => void
  currentRow: Project | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Project | null>>
}

const ProjectContext = React.createContext<ProjectContextType | null>(null)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ProjectDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Project | null>(null)

  return (
    <ProjectContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ProjectContext>
  )
}

export const useProjects = () => {
  const projectContext = React.useContext(ProjectContext)

  if (!projectContext) {
    throw new Error('useProjects has to be used within <ProjectContext>')
  }

  return projectContext
}