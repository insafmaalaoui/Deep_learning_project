"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Clock, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"
import { ReportChatbot } from "@/components/report-chatbot"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

type PredictionStatus = "pending" | "reviewed" | "confirmed"

interface Prediction {
  id: string
  patientName: string
  date: string
  status: PredictionStatus
  prediction: string
  confidence: number
  age: number
  symptoms: string
}

export default function NeurologistDashboard() {
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: "1",
      patientName: "Marie Martin",
      date: "2025-01-12",
      status: "pending",
      prediction: "Positif",
      confidence: 89,
      age: 67,
      symptoms: "Tremblements au repos, rigidité musculaire",
    },
    {
      id: "2",
      patientName: "Pierre Dubois",
      date: "2025-01-11",
      status: "pending",
      prediction: "Négatif",
      confidence: 94,
      age: 52,
      symptoms: "Légers tremblements occasionnels",
    },
    {
      id: "3",
      patientName: "Jean Dupont",
      date: "2025-01-10",
      status: "reviewed",
      prediction: "Négatif",
      confidence: 92,
      age: 45,
      symptoms: "Fatigue générale",
    },
  ])
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null)
  const [report, setReport] = useState("")

  const handleReview = (id: string, newStatus: PredictionStatus) => {
    setPredictions(predictions.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
    setSelectedPrediction(null)
    setReport("")
  }

  const getStatusBadge = (status: PredictionStatus) => {
    const badges = {
      pending: {
        icon: Clock,
        text: "À traiter",
        color: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
      },
      reviewed: { icon: AlertCircle, text: "Examiné", color: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
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
      <DashboardSidebar userType="neurologist" userName="Dr. Sophie Laurent" />

      <div className="flex-1 relative">
        <div className="absolute inset-0 dot-grid opacity-30" />

        <div className="container mx-auto px-8 py-8 relative">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bienvenue, Dr. Laurent
            </h2>
            <p className="text-gray-600 text-lg">Examinez et validez les prédictions de l'IA</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Total prédictions</span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">{predictions.length}</p>
            </Card>
            <Card className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">À traiter</span>
                <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                {predictions.filter((p) => p.status === "pending").length}
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
                {predictions.filter((p) => p.status === "confirmed").length}
              </p>
            </Card>
            <Card className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Précision moy.</span>
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                {Math.round(predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length)}%
              </p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Prédictions à examiner</h3>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <Card
                    key={prediction.id}
                    className={`p-6 border cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      selectedPrediction?.id === prediction.id
                        ? "border-blue-500 shadow-xl bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => setSelectedPrediction(prediction)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{prediction.patientName}</h4>
                        <p className="text-sm text-gray-600">
                          {prediction.age} ans • {prediction.date}
                        </p>
                      </div>
                      {getStatusBadge(prediction.status)}
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900">Prédiction IA:</span>
                        <span
                          className={`text-sm font-bold ${
                            prediction.prediction === "Positif" ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {prediction.prediction}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900">Confiance:</span>
                        <span className="text-sm font-bold text-blue-600">{prediction.confidence}%</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">Symptômes:</span> {prediction.symptoms}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Examen détaillé</h3>
              {selectedPrediction ? (
                <div className="space-y-6">
                  <Card className="p-6 border border-gray-200 shadow-xl bg-white">
                    <div className="mb-6">
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">
                        Patient: {selectedPrediction.patientName}
                      </h4>

                      <div className="space-y-3 mb-6">
                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                          <p className="text-sm font-semibold text-gray-600 mb-1">Âge</p>
                          <p className="text-xl font-bold text-gray-900">{selectedPrediction.age} ans</p>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                          <p className="text-sm font-semibold text-gray-600 mb-1">Prédiction IA</p>
                          <p
                            className={`text-xl font-bold ${
                              selectedPrediction.prediction === "Positif" ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {selectedPrediction.prediction} ({selectedPrediction.confidence}% confiance)
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                          <p className="text-sm font-semibold text-gray-600 mb-1">Symptômes</p>
                          <p className="text-gray-900">{selectedPrediction.symptoms}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Button
                          className="w-full h-11 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg"
                          onClick={() => handleReview(selectedPrediction.id, "confirmed")}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Confirmer et créer le rapport
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full h-11 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 bg-white border-gray-300 text-gray-900"
                          onClick={() => handleReview(selectedPrediction.id, "reviewed")}
                        >
                          Marquer comme examiné
                        </Button>
                      </div>
                    </div>
                  </Card>

                  <ReportChatbot
                    patientData={{
                      name: selectedPrediction.patientName,
                      age: selectedPrediction.age,
                      gender: "Non spécifié",
                      symptoms: selectedPrediction.symptoms,
                      medicalHistory: "Non spécifié",
                    }}
                    predictionData={{
                      prediction: selectedPrediction.prediction,
                      confidence: selectedPrediction.confidence,
                      date: selectedPrediction.date,
                      imageCount: 3,
                    }}
                    onReportGenerated={(report) => setReport(report)}
                  />
                </div>
              ) : (
                <Card className="p-12 border-2 border-dashed border-gray-300 bg-white">
                  <div className="text-center text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Sélectionnez une prédiction pour l'examiner</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
