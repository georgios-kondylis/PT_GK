import React from 'react'

function Info() {
  return (
    <div className="flex flex-col gap-2 
                    max-md:items-center">
      <h3 className="text-[40px] font-bold caligraphy">Georgios Kondylis</h3>
      <a href="tel:+46769018014" className="text-[18px] flex items-center gap-2 hover:text-mainOrange transition1">
        <i className="fa-solid fa-phone"></i> 
        +46 76 901 80 14
      </a>
      <a href="mailto:georgios.p.kondylis@gmail.com" className="text-[18px] flex items-center gap-2  hover:text-mainOrange transition1">
        <i className="fa-solid fa-envelope"></i>
          georgios.p.kondylis@gmail.com
      </a>

      <div className="flex items-center gap-4 mt-4">
        <a href="https://www.linkedin.com/in/georgios-kondylis-7b680a1a7/" target="_blank" rel="noopener noreferrer" className="SOCIAL">
          <i className="fa-brands fa-linkedin text-xl"></i>
        </a>
        <a href="https://www.instagram.com/georgios.kondylis/" target="_blank" rel="noopener noreferrer" className="SOCIAL">
          <i className="fa-brands fa-instagram text-xl"></i>
        </a>
        <a href="https://www.facebook.com/Georgios1995Kondylis/" target="_blank" rel="noopener noreferrer" className="SOCIAL">
          <i className="fa-brands fa-facebook text-xl"></i>
        </a>
      </div>
    </div>
  )
}

export default Info