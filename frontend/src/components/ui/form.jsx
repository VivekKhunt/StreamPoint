import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Controller, FormProvider, useFormContext, useFormState } from 'react-hook-form'
import { cn } from '../../lib/utils'
import { Label } from './label'

const Form = FormProvider
const FormFieldContext = React.createContext({})

const FormField = ({ ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  return { id: itemContext.id, name: fieldContext.name, formItemId: `${itemContext.id}-form-item`, ...fieldState }
}

const FormItemContext = React.createContext({})

function FormItem({ className, ...props }) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn('grid gap-2', className)} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }) {
  const { error, formItemId } = useFormField()
  return <Label className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props} />
}

function FormControl({ ...props }) {
  const { error, formItemId } = useFormField()
  return <Slot id={formItemId} aria-invalid={!!error} {...props} />
}

function FormMessage({ className, children, ...props }) {
  const { error } = useFormField()
  const body = error ? String(error?.message ?? '') : children
  if (!body) return null
  return <p className={cn('text-destructive text-sm', className)} {...props}>{body}</p>
}

export { Form, FormItem, FormLabel, FormControl, FormMessage, FormField, useFormField }