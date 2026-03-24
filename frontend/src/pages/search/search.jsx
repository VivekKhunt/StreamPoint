import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Filter, X } from "lucide-react"
import { Sidebar } from "../../components/sidebar"
import { TopNav } from "../../components/top-nav"
import { BottomNav } from "../../components/bottom-nav"
import { VideoCard } from "../../components/video-card"
import { EmptyState } from "../../components/empty-state"
import { Button } from "../../components/ui/button"
import { DUMMY_VIDEOS, DUMMY_CATEGORIES } from "../../lib/dummy-data"

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  let results = DUMMY_VIDEOS.filter(
    (v) =>
      v.title.toLowerCase().includes(query.toLowerCase()) ||
      v.description.toLowerCase().includes(query.toLowerCase()) ||
      v.owner.name.toLowerCase().includes(query.toLowerCase()),
  )

  if (selectedFilter) {
    results = results.filter((v) => v.category === selectedFilter)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="p-4 md:p-6">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Search Results</h1>
              <p className="text-muted-foreground">
                Results for <span className="font-semibold text-foreground">"{query}"</span>
                {results.length > 0 && <span className="ml-2 text-sm">({results.length} found)</span>}
              </p>
            </div>

            <div className="mb-6">
              <Button
                variant="outline"
                className="gap-2 mb-4"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                Filter by Category
              </Button>

              {showFilters && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 bg-secondary rounded-lg border">
                  {DUMMY_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedFilter(selectedFilter === category ? null : category)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedFilter === category ? "bg-primary text-primary-foreground" : "bg-card"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((video) => <VideoCard key={video.id} video={video} />)}
              </div>
            ) : (
              <EmptyState title="No videos found" description="Try searching with different keywords." />
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}