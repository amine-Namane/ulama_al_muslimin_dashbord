import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface MultiSelectDropdownProps {
  items: { label: string; value: string }[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function MultiSelectDropdown({
  items,
  value,
  onChange,
  placeholder = 'Select items...',
  disabled = false,
  className = '',
}: MultiSelectDropdownProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (itemValue: string) => {
    const newValue = value.includes(itemValue)
      ? value.filter((v) => v !== itemValue)
      : [...value, itemValue]
    onChange(newValue)
  }

  const removeItem = (itemValue: string) => {
    onChange(value.filter((v) => v !== itemValue))
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full border rounded-md p-2 cursor-pointer',
              'flex flex-wrap gap-2 items-start text-left min-h-[2.5rem]',
              'hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring'
            )}
            onClick={() => setOpen(!open)}
          >
            {value.length > 0 ? (
              value.map((selectedValue) => {
                const selectedItem = items.find(
                  (item) => item.value === selectedValue
                )
                return (
                  <Badge
                    key={selectedValue}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {selectedItem?.label || selectedValue}
                    <button
                      type="button"
                      className="p-0 m-0 text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeItem(selectedValue)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="w-full p-0 max-h-[300px] overflow-y-auto"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search items..." />
            <CommandList>
              <CommandEmpty>No items found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => handleSelect(item.value)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={value.includes(item.value)}
                        onCheckedChange={() => handleSelect(item.value)}
                      />
                      <span>{item.label}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
