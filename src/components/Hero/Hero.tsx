import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PopularPrograms, HeroTop, Reviews, About, Contact} from '../exportComponents';



const Hero = () => {

  return (
    <>
    <HeroTop/>
    <PopularPrograms/>
    {/* <NeutritionGuide /> */}
    <Reviews />
    <About />
    <Contact />
    </>
  )
}

export default Hero
