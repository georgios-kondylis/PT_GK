import React from 'react'

const Hero = () => {
  return (
    <section className="bg-[url('/images/run.jpg')] bg-cover bg-center h-screen pt-[60px] mainPX text-white">
      <div className="container mx-auto h-full flex gap20px flex-col items-center justify-center text-center">
        <header className="text-[4rem] font-bold tracking-wide txtShadow">
          Stronger Healthier Happier
        </header>

        <p className="text-lg md:text-xl max-w-[600px]">
          Ready to transform your life? Book a free consult and take the first step toward a stronger you.
        </p>

        <div className="flex gap20px justify-center">
          <button className="bg-[#f6e0b6] text-[#2A2A2A] font-semibold px-6 py-3 rounded-2xl hover:bg-[#F2C94C] transition1">
            Book Free Consult
          </button>
          <button className="bg-transparent border-[2px] border-white text-white px-6 py-3 rounded-2xl hover:bg-white hover:text-[#2A2A2A] transition1">
            Send me DM
          </button>
        </div>

      </div>
    </section>
  )
}

export default Hero
