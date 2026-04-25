import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Activity } from '../data/schema'
import { useTranslation } from 'react-i18next'

type ActivitiesDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Activity
}

export function ActivitiesDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ActivitiesDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { t } = useTranslation()

  const handleDelete = () => {
    if (value.trim() !== currentRow.title) return
    onOpenChange(false)
    showSubmittedData(currentRow, t('activities.deletedMessage'))
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.title}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='stroke-destructive me-1 inline-block'
            size={18}
          />{' '}
          {t('activities.deleteActivity')}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('activities.deleteConfirmQuestion')}{' '}
            <span className='font-bold'>{currentRow.title}</span>?
            <br />
            {t('activities.deleteConfirmDetails')}
          </p>

          {/* Show details from columns */}
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>
              <span className="font-medium">{t('activities.category')}:</span>{' '}
              {currentRow.category}
            </li>
            <li>
              <span className="font-medium">{t('activities.branch')}:</span>{' '}
              {currentRow.branch}
            </li>
            <li>
              <span className="font-medium">{t('activities.participants')}:</span>{' '}
              {currentRow.participants}
            </li>
            <li>
              <span className="font-medium">{t('activities.startDate')}:</span>{' '}
              {currentRow.startDate}
            </li>
            <li>
              <span className="font-medium">{t('activities.endDate')}:</span>{' '}
              {currentRow.endDate}
            </li>
          </ul>

          <Label className='my-2'>
            {t('activities.confirmByTitle')}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('activities.enterTitlePlaceholder')}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('activities.common.warning')}</AlertTitle>
            <AlertDescription>
              {t('activities.deleteWarning')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('activities.common.delete')}
       cancelBtnText={t('newsTable.common.cancale')}
      destructive
    />
  )
}
