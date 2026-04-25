import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { showSubmittedData } from "@/lib/show-submitted-data"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectDropdown } from "@/components/select-dropdown"
import { algerianStates } from "@/features/offices/data/data"
import type { Activity } from "../data/schema"
import { useTranslation } from "react-i18next"

const formSchema = z.object({
  title: z.string().min(1, "Activity name is required"),
  state: z.string().min(1, "State is required"),
  type: z.string().min(1, "Activity type is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  branch: z.string().min(1, "Branch is required"),
  participants: z.number().min(1, "Expected participants is required"),
  image: z.any().optional(),
})

type AddActivityDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Activity | null
}

export function AddActivityDialog({ open, onOpenChange, currentRow }: AddActivityDialogProps) {
  const { t } = useTranslation()
  const isEdit = !!currentRow

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? { ...currentRow, participants: currentRow?.participants ?? 0, image: null }
      : { title: "", state: "", type: "", description: "", startDate: "", endDate: "", branch: "", participants: 0, image: null },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    showSubmittedData(values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={(state) => { form.reset(); onOpenChange(state) }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t("activities.form.editTitle") : t("activities.form.addTitle")}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? t("activities.form.editDescription") : t("activities.form.addDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="h-[26.5rem] w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-0.5">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("activities.form.fields.title")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("activities.form.fields.titlePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-self-start gap-8">
                {/* State */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("activities.form.fields.state")}</FormLabel>
                      <FormControl>
                        <SelectDropdown
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          placeholder={t("activities.form.fields.statePlaceholder")}
                          items={algerianStates.map(({ label, value }) => ({ label, value }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("activities.form.fields.type")}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("activities.form.fields.typePlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="workshop">{t("activities.form.types.workshop")}</SelectItem>
                          <SelectItem value="seminar">{t("activities.form.types.seminar")}</SelectItem>
                          <SelectItem value="conference">{t("activities.form.types.conference")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("activities.form.fields.description")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("activities.form.fields.descriptionPlaceholder")} className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("activities.form.fields.startDate")}</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("activities.form.fields.endDate")}</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-start gap-8">
                {/* Branch */}
                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("activities.form.fields.branch")}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("activities.form.fields.branchPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="branch1">{t("activities.form.branches.branch1")}</SelectItem>
                          <SelectItem value="branch2">{t("activities.form.branches.branch2")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Participants */}
                <FormField
                  control={form.control}
                  name="participants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("activities.form.fields.participants")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t("activities.form.fields.participantsPlaceholder")}
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("activities.form.fields.image")}</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" className="bg-[#095555]">
                  {isEdit ? t("activities.form.actions.update") : t("activities.form.actions.add")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
