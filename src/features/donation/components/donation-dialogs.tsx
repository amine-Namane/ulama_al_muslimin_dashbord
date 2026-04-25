import { DonationActionDialog } from './donation-action-dialog'
import { DonationViewDialog } from './donation-invite-dialog'
import { DonationDeleteDialog } from './donation-delete-dialog'
import { useDonation } from './donation-provider'

export function DonationDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useDonation()

  return (
    <>
      <DonationActionDialog
        key="donation-add"
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />
      {currentRow && (
        <>
          <DonationViewDialog
            key={`donation-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <DonationActionDialog
            key={`donation-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <DonationDeleteDialog
            key={`donation-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}