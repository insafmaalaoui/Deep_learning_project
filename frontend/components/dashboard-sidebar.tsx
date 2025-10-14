"use client"

import { Brain, LayoutDashboard, FileText, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  userType: "patient" | "neurologist" | "admin"
  userName: string
}

export function DashboardSidebar({ userType, userName }: SidebarProps) {
  const pathname = usePathname()

  const getMenuItems = () => {
    switch (userType) {
      case "patient":
        return [
          { icon: LayoutDashboard, label: "Tableau de bord", href: "/patient" },
          { icon: FileText, label: "Mes analyses", href: "/patient/analyses" },
          { icon: Settings, label: "Paramètres", href: "/patient/settings" },
        ]
      case "neurologist":
        return [
          { icon: LayoutDashboard, label: "Tableau de bord", href: "/neurologist" },
          { icon: FileText, label: "Prédictions", href: "/neurologist/predictions" },
          { icon: Users, label: "Patients", href: "/neurologist/patients" },
          { icon: Settings, label: "Paramètres", href: "/neurologist/settings" },
        ]
      case "admin":
        return [
          { icon: LayoutDashboard, label: "Tableau de bord", href: "/admin" },
          { icon: Users, label: "Utilisateurs", href: "/admin/users" },
          { icon: FileText, label: "Prédictions", href: "/admin/predictions" },
          { icon: Settings, label: "Paramètres", href: "/admin/settings" },
        ]
    }
  }

  const menuItems = getMenuItems()

  const getUserTypeLabel = () => {
    switch (userType) {
      case "patient":
        return "Patient"
      case "neurologist":
        return "Neurologue"
      case "admin":
        return "Administrateur"
    }
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-violet-600 flex items-center justify-center shadow-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">NeuroDetect</h1>
            <p className="text-xs text-gray-500">{getUserTypeLabel()}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </Link>
          )
        })}
      </nav>

      {/* User info and logout */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
          <p className="text-xs text-gray-500">{getUserTypeLabel()}</p>
        </div>
        <Link href="/login" className="block">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-gray-200 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </Link>
      </div>
    </aside>
  )
}
