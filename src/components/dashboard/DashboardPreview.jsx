import React from "react"

const DashboardPreview = () => {
  return (
    <div className="px-4 sm:px-10 xl:px-24 py-24">

      <div className="
        rounded-[32px]
        border border-cyan-500/20
        bg-[#0b1120]/70
        backdrop-blur-xl
        p-10
      ">

        <div className="
          flex
          flex-col
          lg:flex-row
          gap-10
        ">

          {/* LEFT */}
          <div className="flex-1">

            <p className="text-cyan-400 font-semibold mb-4">
              AI Productivity Dashboard
            </p>

            <h2 className="
              text-white
              text-4xl
              font-extrabold
              leading-tight
            ">
              Track your progress with intelligent analytics
            </h2>

            <p className="
              text-slate-400
              mt-6
              leading-8
            ">
              Monitor study streaks, productivity trends,
              completed tasks, and AI-generated insights
              all in one futuristic dashboard.
            </p>

          </div>

          {/* RIGHT */}
          <div className="
            flex-1
            grid
            grid-cols-2
            gap-6
          ">

            <div className="
              rounded-2xl
              bg-[#111827]
              p-6
              border border-cyan-500/10
            ">
              <p className="text-slate-400">
                Study Streak
              </p>

              <h3 className="
                text-white
                text-4xl
                font-bold
                mt-4
              ">
                18 Days
              </h3>
            </div>

            <div className="
              rounded-2xl
              bg-[#111827]
              p-6
              border border-cyan-500/10
            ">
              <p className="text-slate-400">
                Tasks Completed
              </p>

              <h3 className="
                text-white
                text-4xl
                font-bold
                mt-4
              ">
                126
              </h3>
            </div>

            <div className="
              rounded-2xl
              bg-[#111827]
              p-6
              border border-cyan-500/10
            ">
              <p className="text-slate-400">
                Focus Hours
              </p>

              <h3 className="
                text-white
                text-4xl
                font-bold
                mt-4
              ">
                84h
              </h3>
            </div>

            <div className="
              rounded-2xl
              bg-[#111827]
              p-6
              border border-cyan-500/10
            ">
              <p className="text-slate-400">
                Productivity
              </p>

              <h3 className="
                text-cyan-400
                text-4xl
                font-bold
                mt-4
              ">
                92%
              </h3>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default DashboardPreview