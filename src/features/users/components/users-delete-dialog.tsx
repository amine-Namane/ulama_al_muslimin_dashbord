'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type User } from '../data/schema'
import { useTranslation } from 'react-i18next'

type UserDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: UserDeleteDialogProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.username) return

    onOpenChange(false)
    showSubmittedData(currentRow, t('users.deletedMessage'))
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='stroke-destructive me-1 inline-block'
            size={18}
          />{' '}
          {t('users.deleteUser')}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('users.deleteConfirmQuestion')}{' '}
            <span className='font-bold'>{currentRow.username}</span>?
            <br />
            {t('users.deleteConfirmRole')}{' '}
            <span className='font-bold'>
              {currentRow.role.toUpperCase()}
            </span>. {t('users.common.cannotBeUndone')}
          </p>

          <Label className='my-2'>
            {t('users.usernameLabel')}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('users.enterUsernamePlaceholder') ?? ''}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('users.common.warning')}</AlertTitle>
            <AlertDescription>
              {t('users.deleteWarning')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('users.common.delete')}
       cancelBtnText={t('newsTable.common.cancale')}
      destructive
    />
  )
}
