import React, { useState } from 'react'
import { useGlobalProps } from '../components/GlobalPropsProvider';

const SignIn = () => {
  const { signInOpen, setSignInOpen } = useGlobalProps();
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className='fixed w-full h-full min-h-[100dvh] left-0 top-0 bg-[#000000d0] flex items-center justify-center px-4 z-[90]'>
      <div className='relative bg-white rounded-2xl shadow-lg w-full max-w-md p-8'>
        
        <span className='absolute top-[10px] right-[15px] text-[22px] hover:rotate-180 hover:translate-y-[-2px] hover:scale-105 transition1 cursor-pointer text-mainOrange hover:text-[#ff8000f0]'
              onClick={() => setSignInOpen(false)}>
          <i className="fa-solid fa-circle-xmark"></i>
        </span>
        
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>LogIn</h2>
        <form className='flex flex-col gap-4'>
          <div>
            <label className='text-sm font-light italic text-gray-700 mb-[5px]'>Email</label>
            <div className='border-b flex items-center px-1 py-1 gap-3 hover:border-b-[black]'>
              <i className="fa-solid fa-user text-[#909090]"></i>
              <input type='email' placeholder='you@example.com'
                     className='w-full outline-none'/>
            </div>
          </div>
          <div>
            <label className='text-sm font-light italic text-gray-700 mb-[5px]'>Email</label>
            <div className='border-b flex items-center px-1 py-1 gap-3 hover:border-b-[black]'>
              <i className="fa-solid fa-lock text-[#909090]"></i>
              <input type={showPassword? 'text' : 'password'} placeholder='Password'
                     className='w-full outline-none'/>
              {showPassword? 
              <i className="fa-solid fa-eye-slash"></i> :
              <i className="fa-solid fa-eye"></i> }
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              type='password'
              placeholder='••••••••'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainOrange'
            />
          </div>
          <button type='submit'
            className='mt-4 fireBG text-white py-2 rounded-lg transition1'
          >
            LOGIN
          </button>
        </form>
        <p className='text-sm text-gray-600 text-center mt-4'>
          Don’t have an account? <span className='text-blue-600 hover:underline cursor-pointer'>Sign up</span>
        </p>
      </div>
    </div>
  )
}

export default SignIn
