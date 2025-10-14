"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Send, FileText, Copy, Download, Sparkles } from "lucide-react"

interface ReportChatbotProps {
  patientData: {
    name: string
    age: number
    gender: string
    symptoms: string
    medicalHistory: string
  }
  predictionData: {
    prediction: string
    confidence: number
    date: string
    imageCount: number
  }
  onReportGenerated?: (report: string) => void
}

export function ReportChatbot({ patientData, predictionData, onReportGenerated }: ReportChatbotProps) {
  const [input, setInput] = useState("")
  const [fullReport, setFullReport] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/generate-report",
      body: { patientData, predictionData },
    }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "in_progress") return

    sendMessage({ text: input })
    setInput("")
  }

  const generateFullReport = () => {
    const prompt = `Génère un rapport médical complet et professionnel pour ce patient incluant:
1. En-tête avec informations du patient
2. Motif de consultation et symptômes
3. Analyse des images IRM par CNN
4. Interprétation des résultats
5. Conclusion diagnostique
6. Recommandations cliniques
7. Note de validation par neurologue`

    sendMessage({ text: prompt })
  }

  const copyToClipboard = () => {
    const lastAssistantMessage = messages.filter((m) => m.role === "assistant").pop()
    if (lastAssistantMessage) {
      const text = lastAssistantMessage.parts
        .filter((p) => p.type === "text")
        .map((p) => (p.type === "text" ? p.text : ""))
        .join("")
      navigator.clipboard.writeText(text)
    }
  }

  const downloadReport = () => {
    const lastAssistantMessage = messages.filter((m) => m.role === "assistant").pop()
    if (lastAssistantMessage) {
      const text = lastAssistantMessage.parts
        .filter((p) => p.type === "text")
        .map((p) => (p.type === "text" ? p.text : ""))
        .join("")

      const blob = new Blob([text], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `rapport-${patientData.name}-${new Date().toISOString().split("T")[0]}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <Card className="p-6 bg-white border-2 border-blue-100 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Assistant de Rédaction IA</h3>
          <p className="text-sm text-gray-600">Génération automatique de rapports médicaux</p>
        </div>
      </div>

      {/* Quick Action */}
      <div className="mb-6">
        <Button
          onClick={generateFullReport}
          disabled={status === "in_progress"}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          <FileText className="w-5 h-5 mr-2" />
          Générer le Rapport Complet
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="mb-4 max-h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="font-medium">Commencez par générer un rapport ou posez une question</p>
            <p className="text-sm mt-1">L'IA a accès à toutes les informations du patient</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white border-2 border-blue-100 text-gray-900"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <div key={index} className="whitespace-pre-wrap text-sm leading-relaxed">
                        {part.text}
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          ))
        )}
        {status === "in_progress" && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-blue-100 rounded-2xl px-4 py-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div
                  className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {messages.length > 0 && (
        <div className="flex gap-2 mb-4">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
            className="flex-1 border-blue-200 hover:bg-blue-50 bg-transparent"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copier
          </Button>
          <Button
            onClick={downloadReport}
            variant="outline"
            size="sm"
            className="flex-1 border-blue-200 hover:bg-blue-50 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez une question ou demandez une modification du rapport..."
          className="flex-1 min-h-[60px] resize-none border-2 border-blue-100 focus:border-blue-500 rounded-xl"
          disabled={status === "in_progress"}
        />
        <Button
          type="submit"
          disabled={!input.trim() || status === "in_progress"}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Les rapports générés doivent être validés par un neurologue qualifié
      </p>
    </Card>
  )
}
