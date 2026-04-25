import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type ContactRequest } from '../data/schema'
import { useTranslation } from 'react-i18next'

type ContactDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: ContactRequest
}

export function ContactDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ContactDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { t } = useTranslation()

  const handleDelete = () => {
    if (value.trim() !== currentRow.senderName) return
    onOpenChange(false)
    // here you’d normally call a mutation instead of showSubmittedData
    console.log(t('contacts.deletedMessage'), currentRow)
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.senderName}
      title={
        <span className="text-destructive">
          <AlertTriangle className="stroke-destructive me-1 inline-block" size={18} />{' '}
          {t('contacts.deleteContact')}
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            {t('contacts.deleteConfirmQuestion')}{' '}
            <span className="font-bold">{currentRow.senderName}</span>?
            <br />
            {t('contacts.subjectLabel')}{' '}
            <span className="font-bold">{currentRow.subject}</span>
            <br />
            {t('contacts.common.cannotBeUndone')}
          </p>
          <Label className="my-2">
            {t('contacts.senderNameLabel')}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('contacts.enterSenderNamePlaceholder')}
            />
          </Label>
          <Alert variant="destructive">
            <AlertTitle>{t('contacts.common.warning')}</AlertTitle>
            <AlertDescription>
              {t('contacts.deleteWarning')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('contacts.common.delete')}
       cancelBtnText={t('newsTable.common.cancale')}
      destructive
    />
  )
}
