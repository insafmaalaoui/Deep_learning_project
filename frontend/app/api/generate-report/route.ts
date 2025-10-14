import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const {
    messages,
    patientData,
    predictionData,
  }: {
    messages: UIMessage[]
    patientData: any
    predictionData: any
  } = await req.json()

  const systemPrompt = `Tu es un assistant médical spécialisé dans la rédaction de rapports médicaux pour la détection de la maladie de Parkinson.

INFORMATIONS DU PATIENT:
- Nom: ${patientData.name || "Non spécifié"}
- Âge: ${patientData.age || "Non spécifié"} ans
- Sexe: ${patientData.gender || "Non spécifié"}
- Symptômes observés: ${patientData.symptoms || "Non spécifié"}
- Antécédents médicaux: ${patientData.medicalHistory || "Non spécifié"}

RÉSULTATS DE L'ANALYSE CNN:
- Prédiction: ${predictionData.prediction || "Non spécifié"}
- Niveau de confiance: ${predictionData.confidence || "Non spécifié"}%
- Date de l'analyse: ${predictionData.date || "Non spécifié"}
- Nombre d'images IRM analysées: ${predictionData.imageCount || "Non spécifié"}

INSTRUCTIONS:
1. Rédige des rapports médicaux professionnels et détaillés
2. Utilise un langage médical approprié mais compréhensible
3. Base tes conclusions sur les données fournies
4. Inclus des recommandations cliniques pertinentes
5. Sois précis et factuel
6. Structure le rapport de manière claire (Introduction, Analyse, Conclusion, Recommandations)
7. Mentionne toujours que ce rapport doit être validé par un neurologue

Tu peux répondre aux questions sur le patient, générer le rapport complet, ou modifier des sections spécifiques du rapport.`

  const prompt = convertToModelMessages([{ role: "system", content: systemPrompt }, ...messages])

  const result = streamText({
    model: "openai/gpt-5",
    prompt,
    maxOutputTokens: 2000,
    temperature: 0.7,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("[v0] Report generation aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}
