import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

function DropdownMenu({ ...props }) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn('bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-md', className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export { DropdownMenu, DropdownMenuContent, /* ... other Dropdown exports */ }