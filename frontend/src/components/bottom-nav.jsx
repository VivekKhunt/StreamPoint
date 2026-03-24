import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Compass, CheckSquare, Upload, User } from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: <Home size={24} /> },
  { name: "Explore", href: "/explore", icon: <Compass size={24} /> },
  { name: "Subscriptions", href: "/subscriptions", icon: <CheckSquare size={24} /> },
  { name: "Upload", href: "/upload", icon: <Upload size={24} /> },
  { name: "Account", href: "/account", icon: <User size={24} /> },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 flex items-center justify-around md:hidden z-40">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors ${
            location.pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
          title={item.name}
        >
          {item.icon}
          <span className="text-xs font-medium">{item.name}</span>
        </Link>
      ))}
    </div>
  )
}