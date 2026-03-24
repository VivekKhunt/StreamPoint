import React from "react"
import { useParams } from "react-router-dom" // Switched from next/navigation
import { Sidebar } from "../../components/sidebar"
import { TopNav } from "../../components/top-nav"
import { BottomNav } from "../../components/bottom-nav"
import { VideoGrid } from "../../components/video-grid"
import { Button } from "../../components/ui/button"
import { DUMMY_VIDEOS, DUMMY_USERS } from "../../lib/dummy-data"

export default function UserPage() {
  const { userId } = useParams() // React Router syntax
  const user = DUMMY_USERS.find((u) => u.id === userId)
  const userVideos = DUMMY_VIDEOS.filter((v) => v.owner.id === userId)

  if (!user) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav />
          <div className="flex-1 flex items-center justify-center pb-20 md:pb-0">
            <p className="text-muted-foreground">User not found</p>
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {/* Channel Header */}
          <div className="bg-secondary/50 border-b border-border p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 max-w-6xl mx-auto">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-border flex-shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">{user.name}</h1>
                <p className="text-sm text-muted-foreground mb-2">
                  {user.subscribers.toLocaleString()} subscribers • {userVideos.length} videos
                </p>
                <p className="text-foreground text-sm mb-6 line-clamp-2">{user.bio}</p>
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Latest Videos</h2>
            {userVideos.length > 0 ? (
              <VideoGrid videos={userVideos} />
            ) : (
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">This channel has no videos yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}