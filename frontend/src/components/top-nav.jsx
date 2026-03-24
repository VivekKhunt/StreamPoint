import React, { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, Bell, User, LogOut, Settings, MoreVertical } from "lucide-react"
import { Button } from "./ui/button"

export function TopNav() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="bg-card/50 backdrop-blur-md border-b border-border/50 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">▶</span>
        </div>
        <span className="font-bold text-xl hidden sm:inline">StreamPoint</span>
      </Link>

      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-input border rounded-full py-2 px-4 focus:ring-2 focus:ring-primary outline-none"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search size={18} />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2" ref={profileMenuRef}>
        <Button variant="ghost" size="sm" onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <User size={18} />
        </Button>
        {showProfileMenu && (
          <div className="absolute right-4 top-14 w-48 bg-card border rounded-lg shadow-xl p-2 z-50">
            <button className="w-full text-left px-4 py-2 hover:bg-secondary rounded">Settings</button>
            <button className="w-full text-left px-4 py-2 hover:bg-secondary rounded text-destructive">Sign out</button>
          </div>
        )}
      </div>
    </div>
  )
}