import React, { useState } from 'react'
import { useGlobalProps } from '../components/GlobalPropsProvider'

const SignIn = () => {
   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { setSignInOpen, setSignUpOpen } = useGlobalProps()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${BACKEND_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Login failed')

      sessionStorage.setItem('token', data.token) // Save token to session storage
      sessionStorage.setItem('user', JSON.stringify(data.user)) // Save user to session storage
      setSignInOpen(false)
      console.log('User logged in!')

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed w-full h-full min-h-[100dvh] left-0 top-0 bg-[#000000d0] flex items-center justify-center px-4 z-[90]'>
      <div className='relative bg-white rounded-2xl shadow-lg w-full max-w-md p-8'>

        <span className='absolute top-[10px] right-[15px] text-[22px] hover:rotate-180 hover:translate-y-[-2px] hover:scale-105 transition1 cursor-pointer text-mainOrange hover:text-[#ff8000f0]'
          onClick={() => setSignInOpen(false)}>
          <i className="fa-solid fa-circle-xmark"></i>
        </span>

        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>LogIn</h2>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label className='text-sm font-light italic text-gray-700 mb-[5px]'>Email</label>
            <div className='border-b flex items-center px-1 py-1 gap-3 hover:border-b-[black]'>
              <i className="fa-solid fa-envelope text-[#909090]"></i>
              <input
                type='email'
                name='email'
                placeholder='gymbro@gmail.com'
                className='w-full outline-none'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className='text-sm font-light italic text-gray-700 mb-[5px]'>Password</label>
            <div className='border-b flex items-center px-1 py-1 gap-3 hover:border-b-[black]'>
              <i className="fa-solid fa-lock text-[#909090]"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Password'
                className='w-full outline-none'
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className='text-[#909090] hover:text-black cursor-pointer text-[14px]' onClick={() => setShowPassword(prev => !prev)}>
                <i className={`fa-solid fa-eye${showPassword ? '-slash' : ''}`}></i>
              </span>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button type='submit' disabled={loading}
            className='mt-4 fireBG text-white py-2 rounded-md transition1 disabled:opacity-50'>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

        {/* Google Login */}
        <div className='mt-[30px] w-full flex flex-col gap-3 items-center'>
          <p className='text-[gray] text-[14px]'>Or login with</p>

          <div className='flex items-center gap20px'>
            <button className='flex items-center gap-2 border px-2 py-1 rounded-md hover:shadow-md hover:scale-105 transition1'>
              <img className='w-[20px]' src="/icons/googleLogo.png" alt="" />
              <a href="https://pt-gk.onrender.com/user/auth/google"> 
                <p className='text-[18px]'>Google</p>
              </a>
            </button>
          </div>

          <p className='text-[gray] text-[14px] mt-[20px]'>Don't have an account?</p>
          <p
            className='relative text-[14px] cursor-pointer hover:scale-105 group transition1'
            onClick={() => {
              setSignInOpen(false)
              setSignUpOpen(true)
            }}>
            SIGN UP
            <span className='absolute w-[0px] bg-mainOrange rounded-full group-hover:w-full h-[3px] bottom-[-2px] left-0 transition1'></span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
