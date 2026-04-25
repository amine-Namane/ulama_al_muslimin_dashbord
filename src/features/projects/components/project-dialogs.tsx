import { ProjectActionDialog } from './project-action-dialog'
import { ProjectDeleteDialog } from './project-delete-dialog'
import { useProjects } from './project-provider'

export function ProjectDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProjects()
  return (
    <>
      <ProjectActionDialog
        key='project-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <ProjectActionDialog
            key={`project-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ProjectDeleteDialog
            key={`project-delete-${currentRow.id}`}
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