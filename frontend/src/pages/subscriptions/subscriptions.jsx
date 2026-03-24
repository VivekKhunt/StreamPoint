import React from "react"
import { Sidebar } from "../../components/sidebar"
import { TopNav } from "../../components/top-nav"
import { BottomNav } from "../../components/bottom-nav"
import { VideoCard } from "../../components/video-card"
import { DUMMY_VIDEOS, DUMMY_USERS } from "../../lib/dummy-data"

export default function SubscriptionsPage() {
  const subscribedChannels = DUMMY_USERS.slice(0, 3)
  const subscriptionVideos = DUMMY_VIDEOS.filter((v) => 
    subscribedChannels.some((u) => u.id === v.owner.id)
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Subscriptions</h1>
            <p className="text-muted-foreground mb-8">Latest uploads from your subscriptions</p>

            {subscriptionVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {subscriptionVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">
                  No subscribed videos yet. Subscribe to channels to see their videos here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}