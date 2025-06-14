import React, { useRef } from "react";
import { trainingPrograms } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import MainButton from "../UI/MainButton";
import { scrollUp } from "../../utils/reusableFuntions";

const Programs = () => {
  scrollUp()
  // Store refs for each video
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch((err) => console.warn("Autoplay error:", err));
    }
  };

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const navigate = useNavigate();
  return (
    <section className="mainDarkBg text-white w-full flex justify-center min-h-screen">
      <div className="w-full MAX_W">
      <div id="GO_BACK" className="flex w-full justify-start p-[30px]">
        <MainButton size="medium" className="flex items-center gap-2" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
          <p>Go Back</p>
        </MainButton>
      </div>

      <header className="w-full flex flex-col items-center pb-10 gap-3 text-center">
        <h1 className="font-bold text-[2rem]">TRAINING PROGRAMS</h1>
        <p className="max-w-[500px]">
          Every training program is thoughtfully tailored to each individual's unique strengths, goals, and areas for improvement, <br />ensuring a truly personalized fitness experience.
        </p>
      </header>

      <div className="mainPX MAX_W mx-auto flex flex-wrap justify-center gap-[15px] pb-10">
        {trainingPrograms.map((program, i) => (
          <div
            key={i}
            onClick={() =>
              navigate(`/programs/${encodeURIComponent(program.name)}`)
            }
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            className="min-w-[270px] max-w-[320px] flex-1 w-full h-[340px] rounded-2xl shadow-lg overflow-hidden relative group cursor-pointer"
          >
            {/* Static background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition1"
              style={{ backgroundImage: `url(${program.image})` }}
            />

            {/* Video on hover */}
            {program.video && (
              <video
                ref={(el) => (videoRefs.current[i] = el)}
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
            <div className="absolute w-full bottom-[20px] left-1/2 transform -translate-x-1/2 p-4 text-white flex items-center flex-col gap-2 z-20 group">
              <img
                className="w-[150px] absolute bottom-0 group-hover:hidden"
                src={program.label}
                alt=""
              />
              <p className="flex gap20px flex-col opacity-0 transition1 group-hover:opacity-100">
                <span className={`${program.description.length > 250 ? 'text-[14px]' : 'text-[16px]'}`}>{program.description}</span>
                <span className="border mx-auto w-fit p-[7px] rounded-[7px] hover:bg-white hover:text-black transition1">
                  View More
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Programs;
