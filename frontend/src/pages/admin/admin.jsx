import React from "react"
import { Sidebar } from "../../components/sidebar"
import { TopNav } from "../../components/top-nav"
import { BottomNav } from "../../components/bottom-nav"
import { DUMMY_VIDEOS } from "../../lib/dummy-data"
import { Button } from "../../components/ui/button"
import { Trash2, Eye } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="p-4 md:p-6 max-w-6xl">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Moderation Dashboard
            </h1>
            <p className="text-muted-foreground mb-8">Manage and moderate platform content</p>

            <div className="bg-card border border-border rounded-lg overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Video</th>
                    <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground hidden sm:table-cell">
                      Creator
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground hidden md:table-cell">
                      Views
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {DUMMY_VIDEOS.slice(0, 5).map((video) => (
                    <tr key={video.id} className="hover:bg-secondary/50">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt=""
                            className="w-12 h-8 rounded object-cover shrink-0"
                          />
                          <span className="text-sm text-foreground truncate">{video.title}</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-foreground hidden sm:table-cell">
                        {video.owner.name}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-foreground hidden md:table-cell">
                        {video.views.toLocaleString()}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-semibold">
                          Approved
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}