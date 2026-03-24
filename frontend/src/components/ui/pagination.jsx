import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { buttonVariants } from './button'

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }) {
  return <ul className={cn('flex flex-row items-center gap-1', className)} {...props} />
}

function PaginationLink({ className, isActive, size = 'icon', ...props }) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  )
}

const PaginationPrevious = ({ className, ...props }) => (
  <PaginationLink size="default" className={cn('gap-1 px-2.5', className)} {...props}>
    <ChevronLeftIcon className="size-4" />
    <span>Previous</span>
  </PaginationLink>
)

const PaginationNext = ({ className, ...props }) => (
  <PaginationLink size="default" className={cn('gap-1 px-2.5', className)} {...props}>
    <span>Next</span>
    <ChevronRightIcon className="size-4" />
  </PaginationLink>
)

// Fixed variables for export
const PaginationItem = (props) => <li {...props} />
const PaginationEllipsis = ({ className, ...props }) => (
  <span className={cn('flex size-9 items-center justify-center', className)} {...props}>
    <MoreHorizontalIcon className="size-4" />
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}