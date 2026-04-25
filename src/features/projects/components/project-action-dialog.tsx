
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
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'
import { priorities, statuses,algerianStates } from '../data/data'
import { type Project } from '../data/schema'
import { useTranslation } from 'react-i18next'

const formSchema = z.object({
  name: z.string().min(1, 'Project name is required.').max(200, 'Name too long'),
  slug: z.string().min(1, 'Slug is required.'),
  description: z.string().min(1, 'Description is required.').max(500, 'Description too long'),
  details: z.string().min(1, 'Project details are required.'),
  owner: z.string().min(1, 'Project owner is required.'),
  priority: z.string().min(1, 'Priority is required.'),
  status: z.string().min(1, 'Status is required.'),
  type: z.string().min(1, 'Type is required.'), // ADDED
  state: z.string().min(1, 'State is required.'), // ADDED
  startDate: z.string().min(1, 'Start date is required.'), // ADDED
  endDate: z.string().min(1, 'End date is required.'), // ADDED
  Beneficiaries: z.string().min(1, 'Beneficiaries count is required.'), // ADDED
  tags: z.string().optional(),
  budget: z.string().optional(),
  estimatedHours: z.string().optional(),
  isEdit: z.boolean(),
   image: z.any().optional(),
})

type ProjectForm = z.infer<typeof formSchema>

type ProjectActionDialogProps = {
  currentRow?: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectActionDialog({
  currentRow,
  open,
  onOpenChange,
}: ProjectActionDialogProps) {
  const {t}=useTranslation()
  const isEdit = !!currentRow
  const form = useForm<ProjectForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          type: currentRow.type || '', // ADDED
          state: currentRow.state || '', // ADDED
          startDate: currentRow.startDate ? new Date(currentRow.startDate).toISOString().split('T')[0] : '', // ADDED
          endDate: currentRow.endDate ? new Date(currentRow.endDate).toISOString().split('T')[0] : '', // ADDED
          Beneficiaries: currentRow. Beneficiaries?.toString() || '', // ADDED (assuming familyCount is the field name)
          tags: currentRow.tags?.join(', ') || '',
          budget: currentRow.budget?.toString() || '',
          estimatedHours: currentRow.estimatedHours?.toString() || '',
          image: null,
          isEdit,
        }
      : {
          name: '',
          slug: '',
          description: '',
          details: '',
          owner: '',
          priority: '',
          status: '',
          type: '', // ADDED
          state: '', // ADDED
          startDate: '', // ADDED
          endDate: '', // ADDED
          Beneficiaries: '', // ADDED
          tags: '',
          budget: '',
          estimatedHours: '',
          image: null,
          isEdit,
        },
  })

  const onSubmit = (values: ProjectForm) => {
    form.reset()
    showSubmittedData(values)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>{isEdit ?t('projects.project.updateNew') : t('projects.project.title')}</DialogTitle>
          <DialogDescription>
            {isEdit ? t('projects.project.updateNews') : t('projects.project.createNew')}
          </DialogDescription>
        </DialogHeader>
        <div className='h-[26.5rem] w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='project-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem >
                    <FormLabel className='col-span-2 text-end'>{t('projects.columns.name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('projects.project.example')}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3'/>
                  </FormItem>
                )}
              />
              <div className='flex justify-start gap-8'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem >
                    <FormLabel className='col-span-2 text-end'>{t('projects.columns.type')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className='col-span-4'
                      placeholder={t('projects.project.selectType')}
                      items={[
                        { label: 'Religious', value: 'Religious' },
                        { label: 'Economic', value: 'Economic' },
                        { label: 'Social', value: 'Social' }
                      ]}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
               control={form.control}
               name="state"
               render={({ field }) => (
                 <FormItem >
                   <FormLabel className='col-span-2 text-end'>{t('projects.columns.state')}</FormLabel>
                   <FormControl>
                     <SelectDropdown
                       defaultValue={field.value}
                       className='col-span-4'
                       onValueChange={field.onChange}
                       placeholder={t('projects.project.selectState')}
                       items={algerianStates.map(({ label, value }) => ({
                         label,
                         value,
                       }))}
                     />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             </div>
               <FormField
                control={form.control}
                name='details'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='col-span-2 text-end'>{t('projects.columns.description')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('projects.project.details')}
                        className='resize-none h-32 col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <div className='flex justify-start gap-8'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem >
                    <FormLabel className='col-span-2 text-end'>{t('projects.columns.startDate')}</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem >
                    <FormLabel className='col-span-2 text-end'>{t('projects.columns.endDate')}</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             </div>
<div className='flex justify-start gap-8'>
              <FormField
                control={form.control}
                name='budget'
                render={({ field }) => (
                  <FormItem >
                    <FormLabel className='col-span-2 text-end'>{t('projects.columns.donations')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='50000'
                        className='col-span-4'
                        type='number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='Beneficiaries'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='col-span-2 text-end'>{t('projects.columns.beneficiaries')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='100'
                        className='col-span-4'
                        type='number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

             </div>
              <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('projects.project.chooseFile')}</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='project-form' className='bg-[#095555]'>
            {isEdit ? t('projects.project.updateNew') :t('projects.project.addNew')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}