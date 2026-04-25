import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Role } from '../data/schema'

type RoleDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Role
}

export function RoleDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: RoleDeleteDialogProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return
    onOpenChange(false)
    showSubmittedData(
      currentRow,
      t('roles.role.deleteSuccess', 'The following role has been deleted:')
    )
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='stroke-destructive me-1 inline-block'
            size={18}
          />{' '}
          {t('roles.role.deleteTitle')}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('roles.role.deleteConfirmQuestion')}{' '}
            <span className='font-bold'>{currentRow.displayName}</span>?
            <br />
            {t('roles.role.deleteConfirmCategory')}{' '}
            <span className='font-bold'>{currentRow.type.toUpperCase()}</span>.
          </p>

          <Label className='my-2'>
            {t('roles.role.enterNameLabel')}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('roles.role.enterNamePlaceholder')}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('roles.common.warning')}</AlertTitle>
            <AlertDescription>
              {t('roles.role.deleteWarning')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('roles.common.delete')}
       cancelBtnText={t('newsTable.common.cancale')}
      destructive
    />
  )
}
