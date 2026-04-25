import  { AddActivityDialog }  from './activities-action-dialog'
import { ActivitiesDeleteDialog } from './activities-delete-dialog'
import { useActivities } from './activties-provider'

export function ActivitiesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useActivities()
  return (
    <>
      <AddActivityDialog
        key='activities-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <AddActivityDialog
            key={`activities-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ActivitiesDeleteDialog
            key={`activities-delete-${currentRow.id}`}
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
