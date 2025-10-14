"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "patient" as "patient" | "neurologist" | "admin",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (formData.userType === "patient") {
        router.push("/patient")
      } else if (formData.userType === "neurologist") {
        router.push("/neurologist")
      } else {
        router.push("/admin")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white text-blue flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10 fade-in">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="p-8 bg-blue/5 border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-center mb-8">
            <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center glow">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Sign in</h1>
            <p className="text-white/60">Access your personal space</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userType" className="text-sm font-medium">
                Account type
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={formData.userType === "patient" ? "default" : "outline"}
                  className={
                    formData.userType === "patient"
                      ? "bg-white text-black hover:bg-white/90"
                      : "border-white/20 text-white/80 hover:bg-white/10 bg-transparent"
                  }
                  onClick={() => setFormData({ ...formData, userType: "patient" })}
                >
                  Patient
                </Button>
                <Button
                  type="button"
                  variant={formData.userType === "neurologist" ? "default" : "outline"}
                  className={
                    formData.userType === "neurologist"
                      ? "bg-white text-black hover:bg-white/90"
                      : "border-white/20 text-white/80 hover:bg-white/10 bg-transparent"
                  }
                  onClick={() => setFormData({ ...formData, userType: "neurologist" })}
                >
                  Neurologist
                </Button>
                <Button
                  type="button"
                  variant={formData.userType === "admin" ? "default" : "outline"}
                  className={
                    formData.userType === "admin"
                      ? "bg-white text-black hover:bg-white/90"
                      : "border-white/20 text-white/80 hover:bg-white/10 bg-transparent"
                  }
                  onClick={() => setFormData({ ...formData, userType: "admin" })}
                >
                  Admin
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-white text-black hover:bg-white/90 font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/60">
              Don't have an account?{" "}
              <Link href="/register" className="text-white font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
