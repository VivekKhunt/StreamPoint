import React, { useState } from "react"
import { Sidebar } from "../../components/sidebar"
import { TopNav } from "../../components/top-nav"
import { BottomNav } from "../../components/bottom-nav"
import { Button } from "../../components/ui/button"
import { User, Mail, Settings as SettingsIcon, LogOut, Trash2, CheckSquare } from "lucide-react"
import { DUMMY_VIDEOS } from "../../lib/dummy-data"
import { VideoCard } from "../../components/video-card"

export default function AccountPage() {
  const [watchlist, setWatchlist] = useState(DUMMY_VIDEOS.slice(0, 4))

  const handleRemoveFromWatchlist = (videoId) => {
    setWatchlist(watchlist.filter((v) => v.id !== videoId))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">
              Account Settings
            </h1>

            {/* Profile Section */}
            <div className="bg-card rounded-lg p-4 md:p-6 mb-6 border border-border">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <User size={24} />
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-border">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=current-user"
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Alex Johnson</p>
                    <p className="text-sm text-muted-foreground">Premium Member</p>
                  </div>
                  <Button size="sm">Change Avatar</Button>
                </div>

                <div className="space-y-3 mt-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Username</label>
                    <input
                      type="text"
                      defaultValue="alex.johnson"
                      className="w-full mt-1 bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Bio</label>
                    <textarea
                      defaultValue="Video enthusiast and creator"
                      className="w-full mt-1 bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Watchlist Section */}
            <div className="bg-card rounded-lg p-4 md:p-6 mb-6 border border-border">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckSquare size={24} />
                My Watchlist ({watchlist.length})
              </h2>
              {watchlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchlist.map((video) => (
                    <div key={video.id} className="relative group">
                      <VideoCard video={video} />
                      <button
                        onClick={() => handleRemoveFromWatchlist(video.id)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        title="Remove from watchlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Your watchlist is empty</p>
              )}
            </div>

            {/* Email Section */}
            <div className="bg-card rounded-lg p-4 md:p-6 mb-6 border border-border">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Mail size={24} />
                Email & Communications
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex@example.com"
                    className="w-full mt-1 bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <label className="text-sm font-medium text-foreground">Email Notifications</label>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="bg-card rounded-lg p-4 md:p-6 mb-6 border border-border">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <SettingsIcon size={24} />
                Preferences
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <label className="text-sm font-medium text-foreground">Dark Mode</label>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <label className="text-sm font-medium text-foreground">Autoplay Next Video</label>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <label className="text-sm font-medium text-foreground">Save Watch History</label>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-destructive mb-4">Danger Zone</h2>
              <Button variant="destructive" className="w-full sm:w-auto flex items-center gap-2">
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}