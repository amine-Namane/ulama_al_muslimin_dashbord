'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TeachersActionDialog } from './teachers-action-dialog'
import { TeachersDeleteDialog } from './teachers-delete-dialog'
import { useTeachers } from './teachers-provider'

interface TeachersDialogsProps {}

export function TeachersDialogs({}: TeachersDialogsProps) {
  const { t } = useTranslation()
  const { open, setOpen, currentRow, setCurrentRow } = useTeachers()

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setCurrentRow(null)
    }
  }

  return (
    <>
      <TeachersActionDialog
        open={open === 'add' || open === 'edit'}
        onOpenChange={handleOpenChange}
        currentRow={open === 'edit' ? currentRow : null}
      />
      <TeachersDeleteDialog
        open={open === 'delete'}
        onOpenChange={handleOpenChange}
        currentRow={currentRow}
      />
    </>
  )
}
