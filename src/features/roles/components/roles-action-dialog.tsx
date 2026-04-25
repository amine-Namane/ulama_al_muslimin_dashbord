import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelectDropdown } from '@/components/ui/multi-select-dropdown'
import { permissions } from '../data/data'
import { type Role } from '../data/schema'
import { users } from '@/features/users/data/users'
import { useTranslation } from 'react-i18next'
import { useCreateRole, useGetRole } from '../api/rolesapi' 
import { usePermissions } from '../api/rolesapi';
const formSchema = z.object({
  name: z.string().min(1, 'Role name is required.').max(100, 'Name too long'),
  // displayName: z.string().min(1, 'Display name is required.').max(100, 'Display name too long'),
  // description: z.string().min(1, 'Description is required.').max(500, 'Description too long'),
  // type: z.string().min(1, 'Role type is required.'),
  permissions: z.array(z.string()).min(1, 'At least one permission is required.'),
  users: z.array(z.string()).min(1, 'At least one user is required.'),
  // isActive: z.boolean(),
  // priority: z.number().min(0).max(100),
  isEdit: z.boolean(),
})
type Permission = {
  module: string
  actions: string[]
  label?: string
  value?: string
}
type Role = {
  roleName: string
  
}

type RoleForm = z.infer<typeof formSchema>

type RoleActionDialogProps = {
  currentRow?: Role
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RoleActionDialog({
  currentRow,
  open,
  onOpenChange,
}: RoleActionDialogProps) {
  const { t } = useTranslation()
  const isEdit = !!currentRow

  const form = useForm<RoleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          name: '',
          // displayName: '',
          // description: '',
          // type: '',
          permissions: [],
          users: [],
          // isActive: true,
          // priority: 50,
          isEdit,
        },
  })

  // Transform users data for the MultiSelectDropdown
  const userOptions = users.map((user) => ({
    label: `${user.firstName} ${user.lastName} (${user.username})`,
    value: user.id,
    userData: user,
  }))

  // const onSubmit = (values: RoleForm) => {
  //   form.reset()
  //   showSubmittedData(values)
  //   onOpenChange(false)
  // }
  const { mutate: createRole, isPending } = useCreateRole()
const { data: permissionsData, isLoading } = usePermissions()
const { data:Role } = useGetRole()
const onSubmit = (values: RoleForm) => {
  // prepare payload to match your backend format
  const payload = {
    roleName: values.name,
    permissions: values.permissions.map((perm) => {
      const [module, action] = perm.split('.')
      return { module, actions: 'get' }
    }),
  }

  createRole(payload, {
    onSuccess: () => {
      form.reset()
      onOpenChange(false)
    },
  })
}
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-start">
          <DialogTitle>
            {isEdit ? t("roles.form.editTitle") : t("roles.form.addTitle")}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? t("roles.form.editDescription") : t("roles.form.addDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="h-[26.5rem] w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3">
          <Form {...form}>
            <form
              id="role-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-0.5"
            >
              {/* Role Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-end">
                      {t("roles.form.name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("roles.form.namePlaceholder")}
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              {/* Permissions */}
              <FormField
                control={form.control}
                name="permissions"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-start gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-end pt-2">
                      {t("roles.form.permissions")}
                    </FormLabel>
                    <div className="col-span-4 max-h-40">
                      <FormControl className="flex flex-wrap gap-1">
                    
<MultiSelectDropdown
  items={
    permissionsData?.data.flatMap((p: Permission) =>
      (p.actions?.length
        ? p.actions.map((action) => ({
            label: `${p.module} (${action})`,
            value: `${p.module}.${action}`,
          }))
        : [
            {
              label: p.module,
              value: p.module,
            },
          ])
    ) ?? []
  }
  value={field.value}
  onChange={field.onChange}
  placeholder={t("roles.form.permissionsPlaceholder")}
  className="max-h-72 overflow-y-auto"
/>



                      </FormControl>
                      <FormMessage className="mt-1" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Users */}
              <FormField
                control={form.control}
                name="users"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-start gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-end pt-2">
                      {t("roles.form.users")}
                    </FormLabel>
                    <div className="col-span-4 max-h-40">
                      <FormControl className="flex flex-wrap gap-1">
                        <MultiSelectDropdown
                         items={Role?.map((p) => ({
                            label: p.roleName,
                            value: p.id,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={t("roles.form.usersPlaceholder")}
                          className="max-h-72 overflow-y-auto"
                        />
                      </FormControl>
                      <FormMessage className="mt-1" />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button type="submit" form="role-form" className="bg-[#095555]">
            {isEdit ? t("roles.form.updateButton") : t("roles.form.addButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
