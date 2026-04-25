import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquare, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
import { type ContactRequest } from '../data/schema'

const replySchema = z.object({
  subject: z.string().min(1, 'Subject is required.'), // will replace with t()
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
})

type ReplyForm = z.infer<typeof replySchema>

type ContactReplyDialogProps = {
  currentRow?: ContactRequest
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactReplyDialog({
  currentRow,
  open,
  onOpenChange,
}: ContactReplyDialogProps) {
  const { t } = useTranslation()

  const form = useForm<ReplyForm>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      subject: currentRow ? `${t('contacts.reply.prefix')} ${currentRow.subject}` : '',
      message: '',
    },
  })

  const onSubmit = (values: ReplyForm) => {
    const replyData = {
      ...values,
      to: currentRow?.email,
      originalSubject: currentRow?.subject,
      senderName: currentRow?.senderName,
    }

    form.reset()
    showSubmittedData(replyData, t('contacts.reply.successMessage'))
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-start">
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {t('contacts.reply.title')}
          </DialogTitle>
          <DialogDescription>
            {t('contacts.reply.description', {
              name: currentRow?.senderName,
              email: currentRow?.email,
            })}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="reply-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contacts.reply.subject')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('contacts.reply.subjectPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contacts.reply.message')}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none min-h-32"
                      placeholder={t('contacts.reply.messagePlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button type="submit" form="reply-form" className="bg-[#095555]">
            {t('contacts.reply.sendButton')}
            <Send className="h-4 w-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
