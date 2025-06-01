import React, { useState } from "react";
import { reviews } from "../../utils/utils";
import ReviewCard from "./ReviewCard";
import { AnimatePresence, motion, Variant, Variants } from "framer-motion";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const slideVariants: Variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      position: "relative",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0 },
    }),
  };

  return (
    <section
      id="reviews"
      className="text-white mainDarkBg bg-cover bg-center w-full py-[30px]"
    >
      <div className="flex flex-col MAX_W mainPX mx-auto">
        <header className="headerStyles">
          AMAZING SUCCESS STORIES
        </header>

        <div className="flex gap-4 justify-between items-center relative min-h-[300px]">
          <i
            onClick={handlePrev}
            className="fa-solid fa-circle-arrow-left
            text-[40px] rounded-full transition1 cursor-pointer z-10 bg-[#151515] hover:scale-[1.1] hover:text-[#d1d1d1]
             max-sm:absolute left-0 top-[30%]"
          ></i>

          <div className="w-full flex justify-center relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ReviewCard review={reviews[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <i
            onClick={handleNext}
            className="fa-solid fa-circle-arrow-right
            text-[40px] rounded-full transition1 cursor-pointer z-10 bg-[#151515] hover:scale-[1.1] hover:text-[#d1d1d1]
            max-sm:absolute right-0 top-[30%]"
          ></i>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
