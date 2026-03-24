import React, { Component } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "./ui/button"

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
          <AlertCircle className="w-16 h-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            We've logged this error and will look into it. Please try again or refresh the page.
          </p>
          {process.env.NODE_ENV === "development" && (
            <div className="bg-secondary p-4 rounded-lg mb-6 max-w-2xl">
              <p className="text-xs text-muted-foreground font-mono break-all">{this.state.error?.message}</p>
            </div>
          )}
          <Button onClick={this.handleReset}>Try Again</Button>
        </div>
      )
    }

    return this.props.children
  }
}