import React from "react"
import { Link } from "react-router-dom"
import { Search, Plus } from "lucide-react"
import { Button } from "./ui/button"

export function EmptyState({ title, description, icon = <Search size={48} />, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-muted-foreground mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && <p className="text-muted-foreground text-center max-w-md mb-6">{description}</p>}
      {action && (
        <Link to={action.href}>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus size={18} />
            {action.label}
          </Button>
        </Link>
      )}
    </div>
  )
}