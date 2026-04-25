import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Newspaper, Send } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
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

// Schema for News form
const formSchema = z.object({
  title: z.string().min(3, 'Title is required.'),
  category: z.string().min(1, 'Category is required.'),
  content: z.string().min(10, 'Content must be at least 10 characters long.'),
})

type NewsForm = z.infer<typeof formSchema>

type NewsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewsDialog({ open, onOpenChange }: NewsDialogProps) {
  const form = useForm<NewsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', category: '', content: '' },
  })

  const onSubmit = (values: NewsForm) => {
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-start">
          <DialogTitle className="flex items-center gap-2">
            <Newspaper /> Add News
          </DialogTitle>
          <DialogDescription>
            Create a new news article by adding a title, category, and content.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="news-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter news title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Technology, Sports, Health"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Write the full news article here..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="news-form">
            Save <Send />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
