import React, { useRef, useState } from 'react';
import { popularTrainingPrograms, trainingPrograms } from '../../utils';
import { useNavigate } from 'react-router-dom';

const PopularPrograms = () => {
  const navigate = useNavigate();
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

  return (
    <section id='programs' className='mainDarkBg text-white'>
      <header className="w-full flex flex-col items-center py-10 text-center mainPX">
        <h1 className="font-bold text-[2rem] py-[20px]">POPULAR PROGRAMS</h1>
        <p className="sm:text-nowrap">
            All of our workout programs are designed for all fitness levels, <br />
            can be done at home, no gym needed and are tailored to each individual’s needs!
         </p>
      </header>

      <div className="mainPX MAX_W mx-auto flex flex-wrap justify-center gap-[15px] pb-10">
        {popularTrainingPrograms.map((program, i) => (
          <div key={i}
            onClick={() => navigate(`/programs/${encodeURIComponent(program.name)}`)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            className="min-w-[200px] max-w-[260px] flex-1 w-full h-[340px] rounded-2xl shadow-lg overflow-hidden relative group cursor-pointer"
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
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition1 z-10" />

            {/* Content */}
            <div className="absolute w-full bottom-[30px] left-1/2 transform -translate-x-1/2 p-4 text-white flex items-center flex-col gap-2 z-20">
              <img className='w-[150px]' src={program.label} alt="" />
            </div>
          </div>
        ))}
      </div>

      <div className='flex w-full justify-center py-[20px]'>
        <button className='BUTTON' onClick={()=> navigate('/all-training-programs')}>
         See all traning programs
        </button>
      </div>
    </section>
  );
};

export default PopularPrograms;
