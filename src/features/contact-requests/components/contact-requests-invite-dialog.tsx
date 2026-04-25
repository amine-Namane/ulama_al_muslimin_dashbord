import { format } from 'date-fns'
import { Mail, Phone, Calendar, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { statusTypes, type ContactStatus } from '../data/data'
import { type ContactRequest } from '../data/schema'
import { useTranslation } from 'react-i18next'

type ContactViewDialogProps = {
  currentRow?: ContactRequest
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactViewDialog({
  currentRow,
  open,
  onOpenChange,
}: ContactViewDialogProps) {
  const { t } = useTranslation()

  if (!currentRow) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="text-start">
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {t('contacts.contact.detailsTitle')}
          </DialogTitle>
          <DialogDescription>
            {t('contacts.contact.detailsDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status and Date */}
          <div className="flex justify-between items-start">
            <Badge
              variant="outline"
              className={statusTypes.get(currentRow.status as ContactStatus)}
            >
              {currentRow.status.charAt(0).toUpperCase() + currentRow.status.slice(1)}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {t('contacts.contact.sent')}:{' '}
              {format(new Date(currentRow.sentDate), 'MMM dd, yyyy HH:mm')}
            </div>
          </div>

          {/* Sender Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{t('contacts.contact.sender')}</span>
              </div>
              <p className="text-sm ml-6">{currentRow.senderName}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{t('contacts.contact.email')}</span>
              </div>
              <p className="text-sm ml-6">{currentRow.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{t('contacts.contact.phone')}</span>
              </div>
              <p className="text-sm ml-6">{currentRow.phoneNumber}</p>
            </div>

            {currentRow.repliedAt && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{t('contacts.contact.replied')}</span>
                </div>
                <p className="text-sm ml-6">
                  {format(new Date(currentRow.repliedAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <h4 className="font-medium">{t('contacts.contact.subject')}</h4>
            <p className="text-sm bg-muted/30 p-3 rounded-md">
              {currentRow.subject}
            </p>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h4 className="font-medium">{t('contacts.contact.message')}</h4>
            <div className="text-sm bg-muted/30 p-4 rounded-md max-h-48 overflow-y-auto whitespace-pre-wrap">
              {currentRow.message}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
