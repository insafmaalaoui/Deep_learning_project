import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Activity, Users, ArrowRight, CheckCircle2, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-white/10 sticky top-0 z-50 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold">NeuroDetect AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">
              How it works
            </Link>
            <Link href="#technology" className="text-sm text-white/60 hover:text-white transition-colors">
              Technology
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-white text-black hover:bg-white/90 font-medium">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative py-32 md:py-48 overflow-hidden">
        {/* Gradient blob */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute inset-0 dot-grid" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-balance leading-[1.1]">
              Detect <span className="text-gradient">Parkinson's</span> with AI
            </h1>

            <p className="text-xl md:text-2xl text-blue/60 mb-12 text-pretty max-w-2xl mx-auto">
              Advanced medical platform using deep learning to assist neurologists in early Parkinson's disease
              detection
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-delay-1">
              <Link href="/register">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-medium h-12 px-8 text-base">
                  Start analysis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 h-12 px-8 text-base bg-transparent"
                >
                  Professional space
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center fade-in">
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-sm text-white/60">AI Accuracy</div>
            </div>
            <div className="text-center fade-in-delay-1">
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-sm text-white/60">Analyses</div>
            </div>
            <div className="text-center fade-in-delay-2">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-sm text-white/60">Neurologists</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Built for everyone</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Tools adapted for patients, neurologists and administrators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-8 bg-white/5 border-white/10 card-hover backdrop-blur-sm fade-in">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Patients</h3>
              <p className="text-blue/60 mb-6 leading-relaxed">
                Intuitive interface to submit your analyses and track your results in real-time
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-blue/80">Easy data submission</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-blue/80">Real-time tracking</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-blue/80">Complete history</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-white/5 border-white/10 card-hover backdrop-blur-sm fade-in-delay-1">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Neurologists</h3>
              <p className="text-blue/60 mb-6 leading-relaxed">
                Professional tools to analyze, validate and generate medical reports
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-blue/80">Advanced AI predictions</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-blue/80">Medical validation</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-blue/80">Detailed reports</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-white/5 border-white/10 card-hover backdrop-blur-sm fade-in-delay-2">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Administrators</h3>
              <p className="text-blue/60 mb-6 leading-relaxed">
                Complete dashboard to manage the platform and supervise activities
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-blue/80">User management</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-blue/80">Detailed statistics</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-blue/80">Global supervision</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="absolute inset-0 dot-grid" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to start?</h2>
            <p className="text-xl text-blue/60 mb-12">
              Join our platform and benefit from early detection assisted by artificial intelligence
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-medium h-12 px-8">
                  Create free account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-blue hover:bg-white/10 h-12 px-8 bg-transparent"
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold">NeuroDetect AI</div>
                <div className="text-xs text-blue/60">Certified medical platform</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-sm text-white/60">© 2025 NeuroDetect AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
