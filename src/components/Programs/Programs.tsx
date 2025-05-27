import React, {useRef } from 'react'
import { trainingPrograms } from '../../utils'
import { useNavigate } from 'react-router-dom'

const Programs = () => {
    // Store refs for each video
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
    const handleMouseEnter = (index: number) => {
      const video = videoRefs.current[index];
      if (video) { video.play().catch(err => console.warn('Autoplay error:', err)); }
    };
  
    const handleMouseLeave = (index : number) => {
      const video = videoRefs.current[index];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };

  const navigate = useNavigate();
  return (
   <section className='mainDarkBg text-white'>
      <div id='GO_BACK' className='flex w-full justify-start p-[30px]'>
        <button className='BUTTON' onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>

      <header className="w-full flex flex-col items-center pb-10 text-center">
        <h1 className="font-bold text-[2rem]">TRAINING PROGRAMS</h1>
        <p className="max-w-[500px]">
          All of our workout programs can be done at home, NO gym required!
        </p>
      </header>

     <div className="mainPX MAX_W mx-auto flex flex-wrap justify-center gap-[15px] pb-10">
        {trainingPrograms.map((program, i) => (
          <div key={i}
            onClick={() => navigate(`/programs/${encodeURIComponent(program.name)}`)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            className="min-w-[270px] max-w-[320px] flex-1 w-full h-[340px] rounded-2xl shadow-lg overflow-hidden relative group cursor-pointer"
          >
            {/* Static background image */}
            <div className="absolute inset-0 bg-cover bg-center transition1"
              style={{ backgroundImage: `url(${program.image})`, }}
            />

            {/* Video on hover */}
            {program.video && (
              <video ref={(el) => (videoRefs.current[i] = el)}
                src={program.video}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition1 z-0"
                muted
                loop
                playsInline
              />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/80 transition1 z-10" />

            {/* Content */}
            <div className="absolute w-full bottom-[30px] left-1/2 transform -translate-x-1/2 p-4 text-white flex items-center flex-col gap-2 z-20 group">
              <img className='w-[150px] absolute bottom-0 group-hover:hidden' src={program.label} alt="" />
              <p className='flex gap20px flex-col opacity-0 transition1 group-hover:opacity-100'>
                {program.description}
                <span className='border mx-auto w-fit p-[7px] rounded-[7px] hover:bg-white hover:text-black transition1'>
                  View More
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Programs