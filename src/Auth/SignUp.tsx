import React, { useState } from 'react';
import { useGlobalProps } from '../components/GlobalPropsProvider';

const SignUp = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { setSignInOpen, setSignUpOpen } = useGlobalProps();

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/user/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong.');
      alert('User created successfully!');
      setSignUpOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed w-full h-full min-h-[100dvh] left-0 top-0 bg-[#000000d0] flex items-center justify-center px-4 z-[90]'>
      <div className='relative bg-white rounded-2xl shadow-lg w-full max-w-md p-8'>
        <span className='absolute top-[10px] right-[15px] text-[22px] hover:rotate-180 hover:translate-y-[-2px] hover:scale-105 transition1 cursor-pointer text-mainOrange hover:text-[#ff8000f0]'
          onClick={() => setSignUpOpen(false)}>
          <i className="fa-solid fa-circle-xmark"></i>
        </span>

        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Sign Up</h2>
        {error && <p className='text-red-600 text-sm mb-2 text-center'>{error}</p>}

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex gap-4'>
            {['firstName', 'lastName'].map(name => (
              <div key={name} className='w-full'>
                <label className='text-sm font-light italic text-gray-700 mb-[5px]'>{name === 'firstName' ? 'First Name' : 'Last Name'}</label>
                <div className='border-b flex items-center px-1 py-1 gap-3 hover:border-b-[black]'>
                  <input
                    type='text'
                    name={name}
                    placeholder={name === 'firstName' ? 'Georgios' : 'Kondylis'}
                    className='w-full outline-none'
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

         {/* Email */}
          <div>
            <label className='text-sm font-light italic text-gray-700 mb-[5px]'>Email</label>
            <div className='border-b flex items-center p-1 gap-3 hover:border-b-[black]'>
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

          {/* Password */}
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


          <button type='submit' disabled={loading}
            className='mt-4 fireBG text-white py-2 rounded-md transition1 disabled:opacity-60'>
            {loading ? 'Creating account...' : 'SIGN UP'}
          </button>
        </form>

        <div className='mt-[30px] w-full flex flex-col gap-3 items-center'>
          <p className='text-[gray] text-[14px]'>You already have an account?</p>
          <p className='relative text-[14px] cursor-pointer hover:scale-105 group transition1'
            onClick={() => { setSignInOpen(true); setSignUpOpen(false); }}>
            LOGIN
            <span className='absolute w-0 bg-mainOrange rounded-full group-hover:w-full h-[3px] bottom-[-2px] left-0 transition1'></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
