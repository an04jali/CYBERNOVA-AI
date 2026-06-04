import React from "react"

import ToolCard from "./ToolCard"
import SectionHeading from "./SectionHeading"

import {
  creatorTools,
  careerTools,
  studyTools,
} from "./toolsData"

const AiTools = () => {

  return (
    <div className="px-4 sm:px-10 xl:px-24 py-28">

      {/* STUDY OS */}
      <section className="mb-32">

        <SectionHeading
          title="Study OS"
          subtitle="Plan smarter, summarize notes, and accelerate your learning with AI-powered study tools."
        />

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-2
          gap-8
        ">
          {studyTools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>

      </section>

      {/* CAREER OS */}
      <section className="mb-32">

        <SectionHeading
          title="Career OS"
          subtitle="Prepare for interviews, optimize your resume, and boost your career growth with intelligent AI tools."
        />

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-8
        ">
          {careerTools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>

      </section>

      {/* CREATOR TOOLS */}
      <section>

        <SectionHeading
          title="Creator Tools"
          subtitle="Create content, generate visuals, and enhance productivity with futuristic AI creator tools."
        />

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
        ">
          {creatorTools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>

      </section>

    </div>
  )
}

export default AiTools