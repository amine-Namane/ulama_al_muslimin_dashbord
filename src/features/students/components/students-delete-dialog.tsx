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
import { type Student } from '../data/schema'
import { useStudents } from './students-provider'

type StudentsDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Student
}

export function StudentsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: StudentsDeleteDialogProps) {
  const { t } = useTranslation()
  const { setOpen } = useStudents()

  const handleDelete = () => {
    // Add your delete logic here
    setOpen(null)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('users.deleteConfirmation.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('users.deleteConfirmation.description')} {currentRow.firstName}{' '}
            {currentRow.lastName}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('users.deleteConfirmation.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className='bg-destructive'>
            {t('users.deleteConfirmation.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
