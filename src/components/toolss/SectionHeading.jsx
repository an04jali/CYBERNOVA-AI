import React from "react"

const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-14">

      <h2 className="
        text-white
        text-4xl
        sm:text-5xl
        font-extrabold
      ">
        {title}
      </h2>

      <p className="
        text-slate-400
        max-w-2xl
        mx-auto
        mt-5
        text-lg
      ">
        {subtitle}
      </p>

    </div>
  )
}

export default SectionHeading