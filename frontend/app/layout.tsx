import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NeuroDetect - Plateforme de Détection de Parkinson",
  description: "Plateforme médicale de deep learning pour la détection de la maladie de Parkinson",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="antialiased">
      <body className="min-h-screen bg-background font-sans">{children}</body>
    </html>
  )
}
