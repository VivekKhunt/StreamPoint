import React, { useState } from "react"
import { ThumbsUp } from "lucide-react"
import { Button } from "./ui/button"

export function CommentsSection({ comments, videoTitle }) {
  const [newComment, setNewComment] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "popular") {
      return b.likes - a.likes
    }
    return 0 
  })

  return (
    <div className="space-y-6 mt-8">
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">{comments.length} Comments</h3>

        <div className="flex gap-4 mb-6">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=current-user"
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a public comment..."
              className="w-full bg-secondary text-foreground rounded-lg p-3 resize-none border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="ghost">Cancel</Button>
              <Button disabled={!newComment.trim()}>Comment</Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSortBy("newest")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              sortBy === "newest"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              sortBy === "popular"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            Most Popular
          </button>
        </div>

        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={comment.userAvatar || "/placeholder.svg"}
                alt={comment.userName}
                className="w-10 h-10 rounded-full shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">{comment.userName}</span>
                  <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                </div>
                <p className="text-foreground text-sm mt-1 wrap-break-word">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp size={16} />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}