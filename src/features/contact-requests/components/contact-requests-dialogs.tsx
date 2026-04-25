import { ContactViewDialog } from './contact-requests-invite-dialog'
import { ContactReplyDialog } from './contact-requests-action-dialog'
import { ContactDeleteDialog } from './contact-requests-delete-dialog'
import { useContactRequests } from './contact-requests-provider'

export function ContactDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useContactRequests()

  return (
    <>
      {currentRow && (
        <>
          <ContactViewDialog
            key={`contact-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <ContactReplyDialog
            key={`contact-reply-${currentRow.id}`}
            open={open === 'reply'}
            onOpenChange={() => {
              setOpen('reply')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <ContactDeleteDialog
            key={`contact-delete-${currentRow.id}`}
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