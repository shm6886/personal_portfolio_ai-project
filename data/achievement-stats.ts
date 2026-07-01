import { FaPython } from "react-icons/fa"
import { PenTool, Sparkles } from "lucide-react"
import { AchievementStat } from "@/types"

export const achievementStats: AchievementStat[] = [
  {
    number: "2M+",
    description: "Annual Requests Processed",
    color: "text-primary",
    borderColor: "border-primary",
    glowColor: "shadow-primary/20",
    icon: Sparkles,
    href: "",
  },
  {
    number: "93.5%",
    description: "Decision Accuracy",
    color: "text-secondary",
    borderColor: "border-secondary",
    glowColor: "shadow-secondary/20",
    icon: PenTool,
    href: "",
  },
  {
    number: "60%",
    description: "Requests Automated",
    color: "text-secondary",
    borderColor: "border-secondary",
    glowColor: "shadow-secondary/20",
    icon: FaPython,
    href: "",
  },
]
