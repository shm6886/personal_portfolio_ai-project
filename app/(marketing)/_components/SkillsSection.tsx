"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SiPython, SiJavascript, SiFastapi, SiNextdotjs, SiPostgresql, SiAmazonwebservices as SiAws, SiLangchain } from "react-icons/si"
import { FaJava, FaDatabase } from "react-icons/fa"
import { Cloud, Cpu, Search, FlaskConical, Scale, MessageSquare, Sparkles, Network, CircleDot } from "lucide-react"

type Skill = { name: string; icon: React.ReactNode }

const SKILL_GROUPS: { label: string; color: string; skills: Skill[] }[] = [
  {
    label: "Languages",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "Java", icon: <FaJava /> },
      { name: "SQL", icon: <FaDatabase /> },
    ],
  },
  {
    label: "Cloud & AI",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    skills: [
      { name: "AWS Bedrock", icon: <SiAws /> },
      { name: "AWS Lambda", icon: <SiAws /> },
      { name: "AWS S3", icon: <SiAws /> },
      { name: "AgentCore", icon: <Cloud size={14} /> },
      { name: "Claude 3.5", icon: <Sparkles size={14} /> },
    ],
  },
  {
    label: "Frameworks",
    color: "bg-accent/10 border-accent/30 text-accent",
    skills: [
      { name: "LangChain", icon: <SiLangchain /> },
      { name: "Strands Agents", icon: <Network size={14} /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "RAG", icon: <Search size={14} /> },
    ],
  },
  {
    label: "Evaluation",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    skills: [
      { name: "LLM-as-a-Judge", icon: <Scale size={14} /> },
      { name: "LangSmith", icon: <FlaskConical size={14} /> },
      { name: "Chroma", icon: <CircleDot size={14} /> },
      { name: "PostgreSQL RDS", icon: <SiPostgresql /> },
      { name: "Prompt Optimization", icon: <MessageSquare size={14} /> },
    ],
  },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 border-t border-muted/40">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-display-md italic text-black mb-12"
        >
          Tech Stack
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-accent rounded-full" />
                <p className="text-sm font-body font-semibold text-accent uppercase tracking-widest">
                  {group.label}
                </p>
              </div>

              {/* Skill pills with icons */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.35,
                      delay: groupIndex * 0.1 + skillIndex * 0.06,
                      type: "spring",
                      stiffness: 300,
                    }}
                    whileHover={{ scale: 1.15, y: -4, boxShadow: "0 6px 20px rgba(92,122,92,0.18)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm font-body cursor-default shadow-sm transition-all duration-200 ${group.color}`}
                  >
                    <span className="text-[13px] flex-shrink-0">{skill.icon}</span>
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
