import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Input } from './input'
import { Textarea } from './textarea'

function InputGroup({ className, ...props }) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        'group/input-group border-input relative flex w-full items-center rounded-md border shadow-xs transition-shadow',
        'h-9 has-[>textarea]:h-auto focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring',
        className,
      )}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }) {
  return (
    <Input 
      className={cn('flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0', className)} 
      {...props} 
    />
  )
}

const InputGroupButton = Button

export { 
  InputGroup, 
  InputGroupInput, 
  InputGroupButton 
}