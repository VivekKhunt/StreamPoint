import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Compass, CheckSquare, Upload, Settings, Users } from "lucide-react"

const menuItems = [
  { name: "Home", href: "/", icon: <Home size={20} /> },
  { name: "Explore", href: "/explore", icon: <Compass size={20} /> },
  { name: "Subscriptions", href: "/subscriptions", icon: <CheckSquare size={20} /> },
  { name: "Watchlist", href: "/watchlist", icon: <CheckSquare size={20} /> },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="w-56 bg-card/50 backdrop-blur-sm border-r border-border/50 h-screen overflow-y-auto hidden md:flex flex-col">
      <div className="p-6 border-b border-border/50 flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">▶</span>
        </div>
        <h2 className="font-bold text-lg text-foreground">StreamPoint</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
              location.pathname === item.href
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="border-t border-border/50 p-4 text-xs text-muted-foreground italic">
        Sign in to see subscriptions
      </div>
    </div>
  )
}