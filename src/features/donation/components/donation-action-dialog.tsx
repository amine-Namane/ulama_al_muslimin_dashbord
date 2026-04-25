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
import { donationTypes, paymentMethods, statuses } from '../data/data'
import { type Donation } from '../data/schema'
import { useTranslation } from 'react-i18next'

const formSchema = z.object({
  donorName: z.string().min(1, 'Donor name is required.'),
  donorEmail: z.string().email('Please enter a valid email address.'),
  amount: z.coerce.number().min(1, 'Amount must be greater than 0'),
  currency: z.string().min(1, 'Currency is required.').default('DZD'),
  donationType: z.string().min(1, 'Donation type is required.'),
  paymentMethod: z.string().min(1, 'Payment method is required.'),
  status: z.string().min(1, 'Status is required.'),
  notes: z.string().optional(),
  isEdit: z.boolean(),
})

type DonationForm = z.infer<typeof formSchema>

type DonationActionDialogProps = {
  currentRow?: Donation
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DonationActionDialog({
  currentRow,
  open,
  onOpenChange,
}: DonationActionDialogProps) {
  const { t } = useTranslation()
  const isEdit = !!currentRow

  const form = useForm<DonationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? { ...currentRow, isEdit }
      : {
          donorName: '',
          donorEmail: '',
          amount: 0,
          currency: 'DZD',
          donationType: '',
          paymentMethod: '',
          status: '',
          notes: '',
          isEdit,
        },
  })

  const onSubmit = (values: DonationForm) => {
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="text-start">
          <DialogTitle>
            {isEdit ? t('donations.form.edit') : t('donations.form.add')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('donations.form.updateExisting')
              : t('donations.form.createNew')}
          </DialogDescription>
        </DialogHeader>
        <div className="h-[28rem] w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3">
          <Form {...form}>
            <form
              id="donation-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-0.5"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="donorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('donations.form.fields.donorName')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            'donations.form.fields.donorNamePlaceholder'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="donorEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('donations.form.fields.donorEmail')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t(
                            'donations.form.fields.donorEmailPlaceholder'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('donations.form.fields.amount')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t('donations.form.fields.amountPlaceholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('donations.form.fields.currency')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            'donations.form.fields.currencyPlaceholder'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="donationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('donations.form.fields.donationType')}</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder={t(
                          'donations.form.fields.donationTypePlaceholder'
                        )}
                        items={donationTypes.map(({ label, value }) => ({
                          label,
                          value,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('donations.form.fields.paymentMethod')}</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder={t(
                          'donations.form.fields.paymentMethodPlaceholder'
                        )}
                        items={paymentMethods.map(({ label, value }) => ({
                          label,
                          value,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('donations.form.fields.notes')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('donations.form.fields.notesPlaceholder')}
                        className="resize-none h-24"
                        {...field}
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
          <Button type="submit" form="donation-form" className="bg-[#095555]">
            {isEdit
              ? t('donations.form.update')
              : t('donations.form.add')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
