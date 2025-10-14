"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

type AnalysisStatus = "pending" | "processing" | "completed" | "confirmed"

interface Analysis {
  id: string
  date: string
  status: AnalysisStatus
  prediction?: string
  confidence?: number
}

export default function PatientDashboard() {
  const [analyses, setAnalyses] = useState<Analysis[]>([
    { id: "1", date: "2025-01-10", status: "completed", prediction: "Négatif", confidence: 92 },
    { id: "2", date: "2025-01-05", status: "confirmed", prediction: "Positif", confidence: 87 },
  ])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    age: "",
    gender: "M",
    symptoms: "",
    medicalHistory: "",
  })
  const [mriImages, setMriImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + mriImages.length > 5) {
      alert("Vous ne pouvez télécharger que 5 images maximum")
      return
    }

    setMriImages([...mriImages, ...files])

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setMriImages(mriImages.filter((_, i) => i !== index))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mriImages.length === 0) {
      alert("Veuillez télécharger au moins une image IRM")
      return
    }
    const newAnalysis: Analysis = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    }
    setAnalyses([newAnalysis, ...analyses])
    setShowForm(false)
    setFormData({ age: "", gender: "M", symptoms: "", medicalHistory: "" })
    setMriImages([])
    setImagePreviews([])
  }

  const getStatusBadge = (status: AnalysisStatus) => {
    const badges = {
      pending: {
        icon: Clock,
        text: "En attente",
        color: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
      },
      processing: {
        icon: AlertCircle,
        text: "En cours",
        color: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      },
      completed: {
        icon: CheckCircle2,
        text: "Terminé",
        color: "bg-green-500/10 text-green-400 border border-green-500/20",
      },
      confirmed: {
        icon: CheckCircle2,
        text: "Confirmé",
        color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      },
    }
    const badge = badges[status]
    const Icon = badge.icon
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${badge.color}`}
      >
        <Icon className="w-4 h-4" />
        {badge.text}
      </span>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="patient" userName="Jean Dupont" />

      <div className="flex-1 relative">
        <div className="absolute inset-0 dot-grid opacity-30" />

        <div className="container mx-auto px-8 py-8 relative">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bienvenue, Jean
            </h2>
            <p className="text-gray-600 text-lg">Gérez vos analyses et suivez vos résultats</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Total analyses</span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">{analyses.length}</p>
            </Card>
            <Card className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">En attente</span>
                <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                {analyses.filter((a) => a.status === "pending" || a.status === "processing").length}
              </p>
            </Card>
            <Card className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Confirmées</span>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                {analyses.filter((a) => a.status === "confirmed").length}
              </p>
            </Card>
          </div>

          {/* New Analysis Button */}
          {!showForm && (
            <Card className="p-10 mb-8 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all duration-300 bg-white hover:shadow-lg">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nouvelle analyse</h3>
                <p className="text-gray-600 mb-6">Soumettez vos informations pour une nouvelle analyse</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 h-11 px-8"
                >
                  Commencer une analyse
                </Button>
              </div>
            </Card>
          )}

          {/* Analysis Form */}
          {showForm && (
            <Card className="p-8 mb-8 border border-gray-200 shadow-xl bg-white">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Nouvelle analyse</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
                      Âge
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="45"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                      className="h-11 border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-semibold text-gray-700">
                      Sexe
                    </Label>
                    <select
                      id="gender"
                      className="w-full h-11 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="M">Masculin</option>
                      <option value="F">Féminin</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="mri-images" className="text-sm font-semibold text-gray-900">
                    Images IRM <span className="text-red-600">*</span>
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:border-gray-400 transition-all duration-300">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-gray-900 mb-1">Téléchargez vos images IRM</p>
                      <p className="text-xs text-gray-600 mb-4">Formats acceptés: JPG, PNG, DICOM (Max 5 images)</p>
                      <Input
                        id="mri-images"
                        type="file"
                        accept="image/*,.dcm"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("mri-images")?.click()}
                        className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
                      >
                        Sélectionner les fichiers
                      </Button>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`IRM ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 shadow-lg"
                          >
                            ×
                          </button>
                          <p className="text-xs text-center mt-1 text-gray-600 truncate">{mriImages[index]?.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms" className="text-sm font-semibold text-gray-700">
                    Symptômes observés
                  </Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Décrivez les symptômes que vous avez observés..."
                    rows={4}
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    required
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalHistory" className="text-sm font-semibold text-gray-700">
                    Antécédents médicaux
                  </Label>
                  <Textarea
                    id="medicalHistory"
                    placeholder="Historique médical pertinent..."
                    rows={4}
                    value={formData.medicalHistory}
                    onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                    className="border-gray-300"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg h-11 px-6"
                  >
                    Soumettre l'analyse
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="h-11 px-6 bg-white border-gray-300 hover:bg-gray-50 text-gray-900"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Analyses List */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Mes analyses</h3>
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <Card
                  key={analysis.id}
                  className="p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-gray-900">Analyse #{analysis.id}</h4>
                        {getStatusBadge(analysis.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Date: {analysis.date}</p>
                      {analysis.prediction && (
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-semibold text-gray-900">Prédiction:</span>{" "}
                            <span
                              className={`font-bold ${analysis.prediction === "Positif" ? "text-red-600" : "text-green-600"}`}
                            >
                              {analysis.prediction}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-semibold text-gray-900">Confiance:</span>{" "}
                            <span className="text-blue-600 font-bold">{analysis.confidence}%</span>
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 bg-white border-gray-300 text-gray-900"
                      >
                        Voir détails
                      </Button>
                      {analysis.status === "confirmed" && (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-md"
                        >
                          Télécharger rapport
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
