import React from "react"
import { Sidebar } from "../../components/sidebar"
import { TopNav } from "../../components/top-nav"
import { BottomNav } from "../../components/bottom-nav"
import { Button } from "../../components/ui/button"
import { BarChart3, Upload, Settings, Eye, ThumbsUp, MessageCircle } from "lucide-react"

export default function CreatorStudioPage() {
  const stats = [
    { label: "Total Views", value: "2.4M", icon: Eye, color: "text-blue-500" },
    { label: "Subscribers", value: "125K", icon: ThumbsUp, color: "text-green-500" },
    { label: "Average Engagement", value: "8.2%", icon: MessageCircle, color: "text-purple-500" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <BarChart3 size={32} className="text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Creator Studio</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-lg p-4 md:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-xl md:text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <stat.icon className={`${stat.color} opacity-50`} size={24} />
                  </div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                <div className="flex items-center gap-4">
                  <Upload size={32} className="text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">Upload New Video</h3>
                    <p className="text-sm text-muted-foreground">Create and publish new content</p>
                  </div>
                  <Button size="sm" className="shrink-0">Upload</Button>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                <div className="flex items-center gap-4">
                  <Settings size={32} className="text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">Channel Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage your channel</p>
                  </div>
                  <Button size="sm" className="shrink-0">Settings</Button>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Recent Videos</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                    <div className="w-16 h-9 bg-muted rounded shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">Video Title {i}</p>
                      <p className="text-xs text-muted-foreground">{(Math.random() * 100000) | 0} views</p>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">View</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}