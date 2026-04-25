'use client'

import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { type Teacher } from '../data/schema'
import { useTeachers } from './teachers-provider'

interface TeachersDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Teacher | null
}

export function TeachersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: TeachersDeleteDialogProps) {
  const { t } = useTranslation()
  const { setOpen, setCurrentRow } = useTeachers()

  const handleConfirm = () => {
    // Handle delete logic here
    console.log('Delete teacher:', currentRow?.id)
    setOpen(null)
    setCurrentRow(null)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2'>
            <AlertTriangle className='h-5 w-5 text-red-500' />
            {t('teachers.deleteConfirmation.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('teachers.deleteConfirmation.description')}
            <br />
            <span className='font-semibold'>
              {currentRow?.firstName} {currentRow?.lastName}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(null)}>
            {t('teachers.deleteConfirmation.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className='bg-red-500 hover:bg-red-600'
          >
            {t('teachers.deleteConfirmation.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
