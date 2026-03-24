import React from "react"

export function SkeletonCard() {
  return (
    <div className="group cursor-pointer">
      <div className="relative bg-secondary rounded-xl overflow-hidden mb-3 aspect-video animate-pulse" />
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-secondary animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-secondary rounded animate-pulse" />
          <div className="h-3 bg-secondary rounded w-3/4 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}