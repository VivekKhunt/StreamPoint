import React from "react"

export function CategoryFilters({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-2 pb-6 overflow-x-auto scrollbar-hide scroll-smooth">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all shrink-0 border ${
            selected === category
              ? "bg-primary text-primary-foreground border-primary shadow-lg hover:shadow-xl hover:bg-primary/90"
              : "bg-secondary text-foreground border-border hover:border-primary hover:bg-muted"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}