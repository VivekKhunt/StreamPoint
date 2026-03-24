import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '../../lib/utils'

function Drawer({ ...props }) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerContent({ className, children, ...props }) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
      <DrawerPrimitive.Content
        className={cn('bg-background fixed inset-x-0 bottom-0 z-50 flex h-auto flex-col rounded-t-lg border-t', className)}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
}

export { Drawer, DrawerContent, /* ... other Drawer exports */ }