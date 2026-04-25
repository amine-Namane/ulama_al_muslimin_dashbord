import { RoleActionDialog } from './roles-action-dialog'
import { RoleDeleteDialog } from './roles-delete-dialog'
import { useRoles } from './roles-provider'

export function RoleDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRoles()
  return (
    <>
      <RoleActionDialog
        key='role-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <RoleActionDialog
            key={`role-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <RoleDeleteDialog
            key={`role-delete-${currentRow.id}`}
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