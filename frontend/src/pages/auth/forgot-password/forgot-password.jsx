import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "../../../components/ui/button"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4">
            <span className="text-primary-foreground font-bold text-2xl">▶</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">StreamPoint</h1>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-2">Reset Password</h2>
              <p className="text-muted-foreground mb-6">
                Enter your email and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <Link
                to="/auth/login"
                className="flex items-center justify-center gap-2 mt-6 text-primary hover:underline"
              >
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Check size={32} className="text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground text-center mb-2">Check your email</h2>
              <p className="text-muted-foreground text-center mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Link to="/auth/login" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg">
                  Back to login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}