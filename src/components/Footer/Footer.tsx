import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  return (
    <footer className="w-full flex justify-center bg-mainDark">
      <motion.div ref={ref}
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex flex-col w-full py-[50px] MAX_W justify-between items-center gap-1"
      >
        {/* LOGO SECTION */}
        <div className="flex items-center gap-3">
          <img src="/icons/logo.png" alt="logo" className="w-12" />
          <img src="/images/mw.png" alt="brand" className="w-[180px]" />
        </div>

        {/* BOTTOM TEXT */}
        <div className="text-center text-xs text-[#c9b87f] mt-3 mainPX">
          © {new Date().getFullYear()} All rights reserved. Made by Georgios Kondylis.
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
