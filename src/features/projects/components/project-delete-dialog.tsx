import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Project } from '../data/schema'
import { useTranslation } from 'react-i18next'

type ProjectDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Project
}

export function ProjectDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ProjectDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { t } = useTranslation()

  const handleDelete = () => {
    if (value.trim() !== currentRow.slug) return
    onOpenChange(false)
    // TODO: connect to real API like remove.mutate(currentRow.id)
    console.log(
      t('projects.project.deletedMessage'),
      currentRow
    )
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.slug}
      title={
        <span className="text-destructive">
          <AlertTriangle
            className="stroke-destructive me-1 inline-block"
            size={18}
          />{' '}
          {t('projects.project.deleteProject')}
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            {t('projects.project.deleteConfirmQuestion')}{' '}
            <span className="font-bold">{currentRow.name}</span>?
            <br />
            {t('projects.project.deleteConfirmPriority')}{' '}
            <span className="font-bold">
              {currentRow.priority.toUpperCase()}
            </span>. {t('projects.common.cannotBeUndone')}
          </p>

          <Label className="my-2">
            {t('projects.project.projectSlug')}:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('projects.project.enterSlugPlaceholder')}
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>{t('projects.common.warning')}</AlertTitle>
            <AlertDescription>
              {t('projects.project.deleteWarning')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('projects.common.delete')}
       cancelBtnText={t('newsTable.common.cancale')}
      destructive
    />
  )
}
