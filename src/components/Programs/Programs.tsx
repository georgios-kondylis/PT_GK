import React from 'react'
import { trainingPrograms } from '../../utils'

const Programs = () => {
  return (
   <div>
      <header className="w-full flex flex-col items-center py-10 text-center">
        <h1 className="font-bold text-[2rem] text-[#2A2A2A]">MOST POPULAR PROGRAMS</h1>
        <p className="text-[#3D3D3D] max-w-[500px]">
          All of our workout programs can be done at home – NO gym required!
        </p>
      </header>

      <div className="mainPX MAX_W mx-auto flex flex-wrap justify-center gap-6 pb-10">
        {trainingPrograms.map((program, i) => (
          <div key={i} className={`min-w-[220px] max-w-[260px] flex-1 w-full h-[340px] rounded-2xl shadow-lg overflow-hidden relative group cursor-pointer `}
            style={{ backgroundImage: `url(${program.image})`, backgroundSize: 'cover', backgroundPosition: 'center', }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition1"></div>

            {/* Content */}
            <div className="absolute bottom-0 p-4 text-white flex flex-col gap-2 z-10">
              <h3 className="text-xl font-bold">{program.name}</h3>
              <p className="text-sm">{program.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Programs