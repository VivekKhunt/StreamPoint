import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Github, Mail, Check } from "lucide-react"
import { Button } from "../../../components/ui/button"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    setTimeout(() => {
      navigate("/")
      setIsLoading(false)
    }, 1000)
  }

  const passwordStrength = formData.password.length >= 12 ? "strong" : formData.password.length >= 8 ? "medium" : "weak"

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
          <h2 className="text-2xl font-bold text-foreground mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-input border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary" />
                {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-input border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary" />
                {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full bg-input border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Password</label>
              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} className="w-full bg-input border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>

            <Button disabled={isLoading} className="w-full bg-primary py-3 rounded-lg">
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-6 text-sm">
            Already have an account? <Link to="/auth/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}