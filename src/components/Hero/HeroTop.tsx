import React from 'react'
import CountUp from 'react-countup';

const HeroTop = () => {
  return (
    <section id='home' className="bg-[url('/images/bg.png')] bg-cover bg-center h-screen pt-[60px] mainPX text-white">
      <div className="MAX_W mx-auto h-full flex gap20px flex-col items-center justify-center text-center">
        <header className="text-[4rem] font-bold tracking-wide txtShadow">
          Stronger Healthier Happier
        </header>

        <p className="text-lg md:text-xl max-w-[600px] txtShadow">
          Ready to transform your life? Book a free consult and take the first step toward a stronger you.
        </p>

        <div className="flex gap20px justify-center">
          <button className="BUTTON">
            Book Free Consult
          </button>
          <button className="bg-transparent border-[2px] hover:font-semibold border-white text-white px-6 py-3 rounded-[8px] hover:bg-white hover:text-[#2A2A2A] transition1">
            Send me DM
          </button>
        </div>

        <div className="flex flex-col mt-[px]">
          <p className='font-bold text-[20px] flex gap-[5px] items-center'>
           
            <img className='w-[30px]' src="/icons/cert.png" alt="" />
             Certified Personal Trainer 
          </p>
          <p>
            Trained <CountUp end={200} duration={2} delay={0.4} /> + clients
          </p>

        </div>
      </div>
    </section>
  )
}

export default HeroTop