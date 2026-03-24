import React, { useState } from "react"
import { Sidebar } from "../../components/sidebar"
import { TopNav } from "../../components/top-nav"
import { BottomNav } from "../../components/bottom-nav"
import { Button } from "../../components/ui/button"
import { Upload, Check } from "lucide-react"

export default function UploadPage() {
  const [uploaded, setUploaded] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="p-4 md:p-6 max-w-4xl">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Upload Video</h1>
            <p className="text-muted-foreground mb-8">Share your content with the world</p>

            <div className="space-y-8">
              {/* Video Upload Dropzone */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">Video File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 md:p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-foreground font-semibold mb-1">Drag and drop your video here</p>
                  <p className="text-sm text-muted-foreground">or click to select a file</p>
                  <p className="text-xs text-muted-foreground mt-4">Max size: 500 MB</p>
                </div>
              </div>

              {/* Video Details Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="My awesome video"
                    maxLength={100}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                  <textarea
                    placeholder="Tell viewers about your video"
                    maxLength={5000}
                    rows={4}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                  <select className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                    <option>Select a category</option>
                    <option>Technology</option>
                    <option>Nature</option>
                    <option>Music</option>
                    <option>Lifestyle</option>
                    <option>Arts</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <Button onClick={() => setUploaded(true)} className="gap-2">
                  {uploaded ? (
                    <>
                      <Check size={18} />
                      Uploaded
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Upload Video
                    </>
                  )}
                </Button>
                <Button variant="outline">Save as Draft</Button>
              </div>

              {uploaded && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-500 animate-in fade-in">
                  <p className="font-semibold">✓ Video uploaded successfully!</p>
                  <p className="text-sm mt-1">Your video will be available shortly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}