import * as React from 'react'
import { useMemo } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Label } from './label'
import { Separator } from './separator'

function FieldSet({ className, ...props }) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn('flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3', className)}
      {...props}
    />
  )
}

function FieldLegend({ className, variant = 'legend', ...props }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn('mb-3 font-medium data-[variant=legend]:text-base data-[variant=label]:text-sm', className)}
      {...props}
    />
  )
}

const fieldVariants = cva('group/field flex w-full gap-3 data-[invalid=true]:text-destructive', {
  variants: {
    orientation: {
      vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
      horizontal: ['flex-row items-center [&>[data-slot=field-label]]:flex-auto'],
    },
  },
  defaultVariants: { orientation: 'vertical' },
})

function Field({ className, orientation = 'vertical', ...props }) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldError({ className, children, errors, ...props }) {
  const content = useMemo(() => {
    if (children) return children
    if (!errors) return null
    if (errors.length === 1 && errors[0]?.message) return errors[0].message
    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {errors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    )
  }, [children, errors])

  if (!content) return null
  return (
    <div 
      role="alert" 
      data-slot="field-error" 
      className={cn('text-destructive text-sm font-normal', className)} 
      {...props}
    >
      {content}
    </div>
  )
}

const FieldLabel = Label
const FieldDescription = (props) => <p {...props} />

export { 
  Field, 
  FieldLabel, 
  FieldDescription, 
  FieldError, 
  FieldSet, 
  FieldLegend 
}