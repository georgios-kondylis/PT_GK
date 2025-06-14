import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full flex justify-center bg-mainDark">
      <div className='flex flex-col w-full py-[50px] MAX_W justify-between items-center gap-1'>
       {/* LOGO SECTION */}
        <div className="flex items-center gap-3">
          <img src="/icons/logo.png" alt="logo" className="w-12" />
          <img src="/images/mw.png" alt="brand" className="w-[180px]" />
        </div>
          {/* BOTTOM TEXT */}
        <div className="text-center text-xs text-[#c9b87f] mt-3 mainPX">
          © {new Date().getFullYear()} All rights reserved. Made by Georgios Kondylis.
        </div>
      </div>
      
    </footer>
  )
}

export default Footer
