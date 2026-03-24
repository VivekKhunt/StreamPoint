import React from "react"
import { Link } from "react-router-dom"
import { Play, Zap, Users, Shield } from "lucide-react"
import { Button } from "../../components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">▶</span>
          </div>
          <span className="font-bold text-xl text-foreground">StreamPoint</span>
        </div>
        <div className="flex gap-3">
          <Link to="/auth/login">
            <Button variant="ghost" className="text-foreground hover:bg-secondary">Sign In</Button>
          </Link>
          <Link to="/auth/register">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign Up</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Watch Unlimited <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">Content</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover thousands of videos, creators, and live streams. Create your channel, share your content, and build your community on StreamPoint.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/auth/register">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-lg gap-2 h-auto">
              <Play size={20} fill="currentColor" />
              Get Started Free
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="border-border hover:bg-secondary text-lg px-8 py-6 rounded-lg h-auto">
              Watch Demo
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <FeatureCard icon={<Zap size={24}/>} title="Lightning Fast" description="Stream high-quality videos with minimal buffering." />
          <FeatureCard icon={<Users size={24}/>} title="Build Community" description="Connect with creators and viewers easily." />
          <FeatureCard icon={<Shield size={24}/>} title="Secure & Private" description="Your content and data are always protected." />
        </div>
      </div>

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; 2026 StreamHub. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 hover:border-primary transition-colors">
      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}