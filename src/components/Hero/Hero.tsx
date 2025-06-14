import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PopularPrograms, HeroTop, Reviews, About, Contact} from '../exportComponents';
import Footer from '../Footer/Footer';



const Hero = () => {

  return (
    <>
    <HeroTop/>
    <PopularPrograms/>
    {/* <NeutritionGuide /> */}
    <Reviews />
    <About />
    <Contact />
    <Footer/>
    </>
  )
}

export default Hero
