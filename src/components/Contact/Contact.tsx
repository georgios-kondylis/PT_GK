import React, { ChangeEvent, useState } from 'react';
import Info from './Info';
import { formInfoTypes } from '../../utils/types';

const Contact = () => {
  const access_key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const [succesfullySent, setSuccesfullySent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formInfo, setFormInfo] = useState<formInfoTypes>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: access_key,
        name: `${formInfo.firstName} ${formInfo.lastName}`,
        email: formInfo.email,
        phone: formInfo.phone,
        subject: formInfo.subject,
        message: formInfo.message,
      }),
    });

    const data = await res.json();
    setIsLoading(false);

    if (data.success) {
      setSuccesfullySent(true);
      setFormInfo({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setSuccesfullySent(false);
      }, 3000);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="mainDarkBg w-full mainPX flex justify-center text-white py-[50px]">
      <div id="container" className="MAX_W w-full flex flex-col items-center">

        <div className='w-full flex items-center gap-5 pb-[70px]'>
          <p className='text-nowrap text-[2.3rem] px-2 caligraphy'>Contact Me</p>
          <span className='h-[2px] rounded-full w-full bg-white'></span>
        </div>

        <div className="flex max-md:flex-col-reverse max-md:gap-[50px] max-md:items-center w-full justify-start gap-[30px]">
          {/* FORM */}
          <form className="flex flex-col gap-4 w-[50%] max-w-[600px] max-md:w-full" onSubmit={handleSubmit}>
            <div className="flex max-sm:flex-col gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="INPUT"
                required
                value={formInfo.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="INPUT"
                required
                value={formInfo.lastName}
                onChange={handleChange}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="INPUT"
              required
              value={formInfo.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (e.g. +46 76 901 80 14)"
              className="INPUT"
              value={formInfo.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="INPUT"
              required
              value={formInfo.subject}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your message..."
              rows={5}
              required
              className="bg-[#333] text-white p-3 rounded-md outline-none resize-none"
              value={formInfo.message}
              onChange={handleChange}
            />

            <button type="submit"
              className={`${succesfullySent? 'bg-[#148486]' : 'fireBG'} py-[10px] rounded-[10px] transition1`}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 
              succesfullySent ? 'Thanks! I’ll get back to you ASAP ' : 'Send Message'}
            </button>
          </form>

           {/* Contact Info */}
          <Info />
        </div>
      </div>
    </section>
  );
};

export default Contact;
