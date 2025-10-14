"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Activity, TrendingUp, User, Brain } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

interface UserData {
  id: string
  name: string
  email: string
  type: "patient" | "neurologist"
  status: "active" | "inactive"
  joinDate: string
}

export default function AdminDashboard() {
  const [users] = useState<UserData[]>([
    {
      id: "1",
      name: "Jean Dupont",
      email: "jean@email.com",
      type: "patient",
      status: "active",
      joinDate: "2025-01-05",
    },
    {
      id: "2",
      name: "Marie Martin",
      email: "marie@email.com",
      type: "patient",
      status: "active",
      joinDate: "2025-01-08",
    },
    {
      id: "3",
      name: "Dr. Sophie Laurent",
      email: "sophie@email.com",
      type: "neurologist",
      status: "active",
      joinDate: "2024-12-15",
    },
    {
      id: "4",
      name: "Pierre Dubois",
      email: "pierre@email.com",
      type: "patient",
      status: "inactive",
      joinDate: "2024-12-20",
    },
  ])

  const stats = {
    totalUsers: users.length,
    patients: users.filter((u) => u.type === "patient").length,
    neurologists: users.filter((u) => u.type === "neurologist").length,
    totalPredictions: 156,
    pendingPredictions: 12,
    confirmedPredictions: 98,
    accuracy: 91,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="admin" userName="Admin" />

      <div className="flex-1 relative">
        <div className="absolute inset-0 dot-grid opacity-30" />

        <div className="container mx-auto px-8 py-8 relative">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tableau de bord administrateur
            </h2>
            <p className="text-gray-600 text-lg">Vue d'ensemble de la plateforme</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Utilisateurs totaux</span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">{stats.totalUsers}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">
                {stats.patients} patients • {stats.neurologists} neurologues
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Prédictions totales</span>
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">{stats.totalPredictions}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">{stats.pendingPredictions} en attente</p>
            </Card>

            <Card className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Confirmées</span>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">{stats.confirmedPredictions}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">
                {Math.round((stats.confirmedPredictions / stats.totalPredictions) * 100)}% du total
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Précision IA</span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">{stats.accuracy}%</p>
              <p className="text-xs text-emerald-600 mt-1 font-semibold">+2% ce mois</p>
            </Card>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-gray-900">Gestion des utilisateurs</h3>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg h-11 px-6">
                <Users className="w-4 h-4 mr-2" />
                Ajouter un utilisateur
              </Button>
            </div>

            <Card className="border border-gray-200 shadow-xl overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 text-sm font-bold text-gray-900">Nom</th>
                      <th className="text-left p-4 text-sm font-bold text-gray-900">Email</th>
                      <th className="text-left p-4 text-sm font-bold text-gray-900">Type</th>
                      <th className="text-left p-4 text-sm font-bold text-gray-900">Statut</th>
                      <th className="text-left p-4 text-sm font-bold text-gray-900">Date d'inscription</th>
                      <th className="text-left p-4 text-sm font-bold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-semibold text-gray-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 font-medium">{user.email}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border ${
                              user.type === "neurologist"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {user.type === "neurologist" ? "Neurologue" : "Patient"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold border ${
                              user.status === "active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                            }`}
                          >
                            {user.status === "active" ? "Actif" : "Inactif"}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600 font-medium">{user.joinDate}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 bg-white border-gray-300 text-gray-900"
                            >
                              Modifier
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Supprimer
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Activité récente</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border border-gray-200 shadow-xl bg-white">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Dernières prédictions</h4>
                <div className="space-y-3">
                  {[
                    { patient: "Marie Martin", result: "Positif", date: "Il y a 2h" },
                    { patient: "Pierre Dubois", result: "Négatif", date: "Il y a 5h" },
                    { patient: "Jean Dupont", result: "Négatif", date: "Il y a 1j" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{item.patient}</p>
                        <p className="text-xs text-gray-600">{item.date}</p>
                      </div>
                      <span
                        className={`text-sm font-bold px-3 py-1 rounded-full ${
                          item.result === "Positif"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-green-50 text-green-700 border border-green-200"
                        }`}
                      >
                        {item.result}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border border-gray-200 shadow-xl bg-white">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Nouveaux utilisateurs</h4>
                <div className="space-y-3">
                  {users.slice(0, 3).map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{user.joinDate}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
