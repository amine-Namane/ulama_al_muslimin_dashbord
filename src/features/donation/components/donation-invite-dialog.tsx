import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { type Donation } from '../data/schema'
import { statusTypes } from '../data/data'

type DonationViewDialogProps = {
  currentRow?: Donation
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DonationViewDialog({
  currentRow,
  open,
  onOpenChange,
}: DonationViewDialogProps) {
  if (!currentRow) return null

  const statusClass = statusTypes.get(currentRow.status as any) || ''

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Donation Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Donor Name</p>
              <p className="font-medium">{currentRow.donorName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">{currentRow.donorEmail}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Amount</p>
              <p className="text-lg font-bold text-green-600">
                {currentRow.amount.toLocaleString()} {currentRow.currency}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant="outline" className={statusClass}>
                {currentRow.status}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Donation Type</p>
              <p className="font-medium">{currentRow.donationType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
              <p className="font-medium">{currentRow.paymentMethod}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground">Date</p>
            <p className="font-medium">{format(currentRow.createdAt, 'PPP')}</p>
          </div>

          {currentRow.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notes</p>
                <p className="text-sm">{currentRow.notes}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}