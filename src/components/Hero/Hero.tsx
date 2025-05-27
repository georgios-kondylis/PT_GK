import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PopularPrograms, HeroTop } from '../exportComponents';


const Hero = () => {

  return (
    <>
    <HeroTop/>
    <PopularPrograms/>
    {/* <Reviews /> */}
    </>
  )
}

export default Hero
