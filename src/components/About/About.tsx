import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { AboutMeText } from '../../utils/utils';

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {opacity: 1,y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id='about' className="w-full mainDarkBg text-white py-10 pt-[100px] mainPX">
      <motion.div ref={ref}
        variants={fadeUpVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mx-auto w-full MAX_W flex flex-col lg:flex-row gap-6 items-center md:items-start"
      >
        {/* Text Section */}
        <div className="w-full md:flex-1">
          <div className='w-full flex flex-row-reverse items-center gap-5 pb-[20px]'>
            <p className='text-nowrap text-[2.3rem] px-2 caligraphy'>About Me</p>
            <span className='h-[2px] rounded-full w-full bg-white'></span>
          </div>

          <p className="md:text-lg md:leading-relaxed">
            Hey, I'm Georgios, certified personal trainer with 10+ years in combat sports, weightlifting, plyometrics, mobility, speed, endurance and explosive training.<br />
            I’ve coached top-level athletes, older adults rebuilding their movement, and kids gaining confidence. No matter who you are, my focus is always the same: train smart, stay functional, and avoid injury.<br />
            I believe training should be fun, simple, and something you actually look forward to, not just another chore.<br />
            My goal? To help you become stronger, faster, and more mobile, in a sustainable way. I’ll meet you where you’re at, and we’ll level up together.<br /><br />
            <span className="block text-2xl font-bold italic text-mainAccent">
              Love the progress, and the results will come.
            </span>
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-[420px] h-[500px] overflow-hidden rounded-xl shadow-2xl">
          <img src="/images/ct.jpg" alt="About me"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
