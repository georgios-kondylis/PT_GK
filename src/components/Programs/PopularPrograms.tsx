import React, { useRef } from "react";
import { popularTrainingPrograms } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import MainButton from "../UI/MainButton";
import { motion, useInView } from "framer-motion";

const PopularPrograms = () => {
  const navigate = useNavigate();
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

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15 },
    }),
  };

  return (
    <section id="programs" className="mainDarkBg text-white">
      <header className="w-full flex flex-col items-center py-10 text-center mainPX">
        <h1 className="headerStyles">POPULAR PROGRAMS</h1>
        <p className="sm:text-nowrap">
          All of our workout programs are designed for all fitness levels, <br />
          can be done at home, no gym needed and are tailored to each
          individual’s needs!
        </p>
      </header>

      <div className="mainPX MAX_W mx-auto flex flex-wrap justify-center gap-[15px] pb-10">
        {popularTrainingPrograms.map((program, i) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true });

          return (
            <motion.div key={i} ref={ref} custom={i}
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onClick={() => navigate(`/programs/${encodeURIComponent(program.name)}`)}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="min-w-[200px] max-w-[260px] flex-1 w-full h-[340px] rounded-2xl shadow-lg overflow-hidden relative group cursor-pointer"
            >
              {/* Static image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition1"
                style={{ backgroundImage: `url(${program.image})` }}
              />

              {/* Hover video */}
              {program.video && (
                <video ref={(el) => (videoRefs.current[i] = el)}
                  src={program.video}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition1 z-0"
                  muted
                  loop
                  playsInline
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition1 z-10" />

              {/* Label */}
              <div className="absolute w-full bottom-[30px] left-1/2 transform -translate-x-1/2 p-4 text-white flex items-center flex-col gap-2 z-20">
                <img className="w-[150px]" src={program.label} alt="" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex w-full justify-center py-[20px]">
        <MainButton
          size="medium"
          onClick={() => navigate("/all-training-programs")}
        >
          See all training programs
        </MainButton>
      </div>
    </section>
  );
};

export default PopularPrograms;
