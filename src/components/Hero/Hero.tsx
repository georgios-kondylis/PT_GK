import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PopularPrograms, HeroTop, Reviews, } from '../exportComponents';


const Hero = () => {

  return (
    <>
    <HeroTop/>
    <PopularPrograms/>
    {/* <NeutritionGuide /> */}
    <Reviews />
    </>
  )
}

export default Hero
