import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, Share2, MoreVertical } from "lucide-react"

export function VideoCard({ video }) {
  const [imageError, setImageError] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  const handleLike = (e) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  return (
    <Link to={`/watch/${video.id}`}>
      <div className="group cursor-pointer relative">
        <div className="relative bg-secondary rounded-xl overflow-hidden mb-3 aspect-video shadow-md hover:shadow-lg transition-all">
          {!imageError ? (
            <img
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-4xl opacity-50">▶</div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded-md text-xs text-white font-semibold">
            {video.duration}
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-1">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? "bg-accent text-white" : "bg-black/60 hover:bg-black/80 text-white"
              }`}
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors text-white">
              <Share2 size={16} />
            </button>
            <button 
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors text-white" 
              onClick={(e) => {
                e.preventDefault();
                setShowActions(!showActions);
              }}
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <img
            src={video.owner.avatar || "/placeholder.svg"}
            alt={video.owner.name}
            className="w-9 h-9 rounded-full shrink-0 border-2 border-border"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 hover:text-foreground transition-colors">
              {video.owner.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatViews(video.views)} views • {video.uploadedAt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}