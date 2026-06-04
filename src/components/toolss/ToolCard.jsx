import React from "react"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ToolCard = ({ tool }) => {

  const navigate = useNavigate()
  const Icon = tool.icon

  return (
    <div
      onClick={() => navigate(tool.path)}
      className="
        group
        cursor-pointer
        rounded-3xl
        border border-cyan-500/20
        bg-[#0b1120]/70
        backdrop-blur-xl
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-cyan-400/40
        hover:shadow-[0_0_30px_rgba(0,198,255,0.12)]
      "
    >
      <div
        className={`
          w-16 h-16 rounded-2xl mb-6
          flex items-center justify-center
          bg-gradient-to-br ${tool.color}
        `}
      >
        <Icon className="text-white" size={28} />
      </div>

      <h3 className="text-white text-2xl font-bold">
        {tool.title}
      </h3>

      <p className="text-slate-400 mt-4 leading-7">
        {tool.description}
      </p>

      <div className="flex items-center gap-2 mt-6 text-cyan-400 font-medium">
        Try now
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition"
        />
      </div>
    </div>
  )
}

export default ToolCard