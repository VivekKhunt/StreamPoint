import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Sidebar } from "../../components/sidebar"
import { TopNav } from "../../components/top-nav"
import { BottomNav } from "../../components/bottom-nav"
import { HLSVideoPlayer } from "../../components/hls-video-player"
import { CommentsSection } from "../../components/comments-section"
import { VideoGrid } from "../../components/video-grid"
import { Button } from "../../components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Flag, Plus } from "lucide-react"
import { DUMMY_VIDEOS, DUMMY_COMMENTS } from "../../lib/dummy-data"

export default function WatchPage() {
  const { id } = useParams()
  const video = DUMMY_VIDEOS.find((v) => v.id === id)
  
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  if (!video) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNav />
          <div className="flex-1 flex items-center justify-center pb-20 md:pb-0">
            <p className="text-foreground">Video not found</p>
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  const relatedVideos = DUMMY_VIDEOS.filter((v) => v.category === video.category && v.id !== video.id)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
            <HLSVideoPlayer 
              video={video} 
              onTimeUpdate={(t) => console.log("Progress:", t)} 
              onEnded={() => console.log("Ended")} 
            />

            <div className="space-y-4">
              <h1 className="text-xl md:text-3xl font-bold text-foreground">{video.title}</h1>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-4">
                  <img src={video.owner.avatar} alt="" className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-semibold">{video.owner.name}</h3>
                    <p className="text-sm text-muted-foreground">{video.owner.subscribers.toLocaleString()} subscribers</p>
                  </div>
                  <Button 
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    variant={isSubscribed ? "secondary" : "default"}
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setIsLiked(!isLiked)} className={isLiked ? "text-primary" : ""}>
                    <ThumbsUp size={18} className="mr-2" /> Like
                  </Button>
                  <Button variant="ghost" onClick={() => setIsDisliked(!isDisliked)} className={isDisliked ? "text-primary" : ""}>
                    <ThumbsDown size={18} />
                  </Button>
                  <Button variant="ghost"><Share2 size={18} className="mr-2" /> Share</Button>
                  <Button variant="ghost"><Plus size={18} /> Save</Button>
                </div>
              </div>

              <div className="bg-secondary rounded-lg p-4">
                <p className="font-semibold text-sm">{video.views.toLocaleString()} views • {video.uploadedAt}</p>
                <p className="text-sm mt-2">{video.description}</p>
              </div>
            </div>

            <CommentsSection comments={DUMMY_COMMENTS} videoTitle={video.title} />

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Related Videos</h2>
              <VideoGrid videos={relatedVideos} />
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}