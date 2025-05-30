import React, { useState } from 'react';
import { AboutMeText } from '../../utils/utils';

const About = () => {
  return (
    <section id='about' className="w-full mainDarkBg text-white py-10 mainPX">
      <div className="mx-auto w-full MAX_W flex flex-col lg:flex-row gap-6 items-center md:items-start">

        {/* Text Section */}
        <div className="w-full md:flex-1">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="md:text-lg lg:text-2xl md:leading-relaxed">
           {AboutMeText}
          </p> 
        </div>
        
         {/* Image Section */}
        <div className="w-full lg:w-[420px] h-[500px] overflow-hidden rounded-xl shadow-2xl">
          <img src="/images/ct.jpg"
            alt="About me"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
