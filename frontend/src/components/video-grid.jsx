import React from "react"
import { VideoCard } from "./video-card"

export function VideoGrid({ videos }) {
  if (!videos || videos.length === 0) {
    return <div className="text-center py-10">No videos found.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}