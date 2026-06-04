import {
  FileText,
  Image,
  Eraser,
  Scissors,
  Briefcase,
  Mic,
  ShieldCheck,
  Clock3,
  BookOpen,
  Brain,
} from "lucide-react"

export const studyTools = [
  {
    title: "AI Study Planner",
    description: "Generate adaptive study schedules powered by AI.",
    icon: BookOpen,
    path: "/ai/study-planner",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Notes Summarizer",
    description: "Summarize PDFs, notes, and lectures instantly.",
    icon: Brain,
    path: "/ai/notes",
    color: "from-purple-500 to-pink-500",
  },
]

export const creatorTools = [
  {
    title: "AI Article Writer",
    description: "Generate engaging articles in seconds.",
    icon: FileText,
    path: "/ai/write-article",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Blog Title Generator",
    description: "Generate catchy SEO-friendly blog titles.",
    icon: FileText,
    path: "/ai/blog-titles",
    color: "from-pink-500 to-purple-500",
  },
  {
    title: "AI Image Generation",
    description: "Create stunning visuals with AI.",
    icon: Image,
    path: "/ai/generate-images",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Background Removal",
    description: "Remove image backgrounds instantly.",
    icon: Eraser,
    path: "/ai/remove-background",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Object Removal",
    description: "Remove unwanted objects from images.",
    icon: Scissors,
    path: "/ai/remove-object",
    color: "from-indigo-500 to-blue-500",
  },
]

export const careerTools = [
  {
    title: "Resume Reviewer",
    description: "Optimize your resume using AI insights.",
    icon: Briefcase,
    path: "/ai/review-resume",
    color: "from-cyan-500 to-teal-500",
  },
  {
    title: "AI Mock Interview",
    description: "Practice interviews with AI feedback.",
    icon: Mic,
    path: "/ai/mock-interview",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "ATS Resume Scorer",
    description: "Get ATS compatibility score instantly.",
    icon: ShieldCheck,
    path: "/ai/ats-score",
    color: "from-cyan-400 to-sky-600",
  },
  {
    title: "History Saver",
    description: "Access all your AI generations anytime.",
    icon: Clock3,
    path: "/ai/history",
    color: "from-slate-500 to-slate-700",
  },
]