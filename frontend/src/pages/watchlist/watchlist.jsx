import React from "react"
import { Sidebar } from "../../components/sidebar"
import { TopNav } from "../../components/top-nav"
import { BottomNav } from "../../components/bottom-nav"
import { VideoGrid } from "../../components/video-grid"
import { DUMMY_VIDEOS, DUMMY_WATCHLIST } from "../../lib/dummy-data"
import { Bookmark } from "lucide-react"

export default function WatchlistPage() {
  const watchlistVideos = DUMMY_VIDEOS.filter((v) => 
    DUMMY_WATCHLIST.some((w) => w.videoId === v.id)
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bookmark size={32} className="text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Watchlist</h1>
            </div>

            {watchlistVideos.length > 0 ? (
              <VideoGrid videos={watchlistVideos} />
            ) : (
              <div className="text-center py-20">
                <Bookmark size={48} className="text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-foreground text-lg font-medium">Your watchlist is empty</p>
                <p className="text-muted-foreground">Videos you save will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}