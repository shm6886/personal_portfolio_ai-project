import { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import HomePageContent from "./HomePageContent"

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Haoming Sun - AI Agent Developer",
    description: "AI Agent Developer building production-grade LLM systems with focus on evaluation, reliability, and observability. 5,000+ DAU, 93.5% decision accuracy.",
    keywords: [
      "AI Agent Developer",
      "LLM",
      "AWS Bedrock",
      "LangChain",
      "RAG",
      "AI Evaluation",
      "Production AI",
    ],
    ogTitle: "Haoming Sun - AI Agent Developer",
    ogDescription: "AI Agent Developer building production-grade LLM systems. Shipped agentic app serving 5,000+ DAU with 93.5% decision accuracy.",
    imageAlt: "Haoming Sun - AI Agent Developer",
    twitterTitle: "Haoming Sun - AI Agent Developer",
    twitterDescription: "AI Agent Developer building production-grade LLM systems with focus on evaluation, reliability, and observability.",
  })
}

export default function HomePage() {
  return <HomePageContent />
}
