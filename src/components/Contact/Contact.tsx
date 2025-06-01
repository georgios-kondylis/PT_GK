import React, { ChangeEvent } from 'react'
import Info from './Info'
import { useState } from 'react'
import { formInfoTypes } from '../../utils/types'

const Contact = () => {
  const [formInfo, setFormInfo] = useState<formInfoTypes>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

 const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormInfo((prev) => ({...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formInfo);
  };

  return (
    <section id="contact" className="mainDarkBg w-full mainPX flex justify-center text-white py-[50px]">
      <div id='container' className="MAX_W w-full flex flex-col items-center">

        <div className='flex max-md:flex-col max-md:gap-[50px] max-md:items-center w-full justify-between'>

          {/* Contact Info */}
           <Info/>

           {/* FORM */}
           <form className="flex flex-col gap-4 w-[50%] max-w-[600px] 
                 max-md:w-full"
                 onSubmit={handleSubmit}>
              <div className="flex max-sm:flex-col gap-4">
                <input type="text" name="firstName" placeholder="First Name" className="INPUT" required 
                  value={formInfo.firstName} onChange={handleChange} 
                />
                <input type="text" name="lastName" placeholder="Last Name" className="INPUT" required 
                  value={formInfo.lastName} onChange={handleChange} 
                />
              </div>

              <input type="email" name="email" placeholder="Email" className="INPUT" required 
                value={formInfo.email} onChange={handleChange} 
              />
              <input type="tel" name="phone" placeholder="Phone (e.g. +46 76 901 80 14)" className="INPUT" 
                value={formInfo.phone} onChange={handleChange} 
              />
              <input type="text" name="subject" placeholder="Subject" className="INPUT" required 
                value={formInfo.subject} onChange={handleChange} 
              />

              <textarea name="message" placeholder="Your message..." rows={5} required
                className="bg-[#333] text-white p-3 rounded-md outline-none resize-none"
                value={formInfo.message}
                onChange={handleChange}
              />


              <button type="submit" className="fireBG py-[10px] rounded-[10px]">
                Send Message
              </button>
            </form>
        </div>

       
      </div>
    </section>
  )
}

export default Contact
