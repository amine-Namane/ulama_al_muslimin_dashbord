import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Donation } from '../data/schema'
import { useTranslation } from 'react-i18next'

type DonationDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Donation
}

export function DonationDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: DonationDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { t } = useTranslation()

  const handleDelete = () => {
    if (value.trim() !== currentRow.id) return
    onOpenChange(false)
    showSubmittedData(currentRow, t('donations.deletedMessage'))
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.id}
      title={
        <span className="text-destructive">
          <AlertTriangle className="stroke-destructive me-1 inline-block" size={18} />{' '}
          {t('donations.deleteDonation')}
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            {t('donations.deleteConfirmQuestion')}{' '}
            <span className="font-bold">{currentRow.donorName}</span>{' '}
            {t('donations.of')}{' '}
            <span className="font-bold">
              {currentRow.amount} {currentRow.currency}
            </span>?
            <br />
            {t('donations.common.cannotBeUndone')}
          </p>
          <Label className="my-2">
            {t('donations.donationId')}:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('donations.enterDonationIdPlaceholder')}
            />
          </Label>
          <Alert variant="destructive">
            <AlertTitle>{t('donations.common.warning')}</AlertTitle>
            <AlertDescription>
              {t('donations.deleteWarning')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('donations.common.delete')}
       cancelBtnText={t('newsTable.common.cancale')}
      destructive
    />
  )
}
