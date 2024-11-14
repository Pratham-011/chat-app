import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";

const CheckEmailPage = () => {
  const [data, setData] = useState({ email: "" });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;

    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({ email: "" });
        navigate('/password', { state: response.data.data });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className='h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center'>
      <div className='bg-gray-700 shadow-lg rounded-lg w-full max-w-md p-8 overflow-hidden'>
        <div className='flex justify-center mb-6'>
          <PiUserCircle size={80} className='text-gray-200' />
        </div>

        <h3 className='text-2xl font-semibold text-center text-gray-200 mb-4'>Welcome to InstantTalk</h3>

        <form className='grid gap-6' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-gray-300'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='border border-gray-500 rounded-md px-4 py-2 bg-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-gray-800 text-lg px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 font-bold text-white leading-relaxed tracking-wide'
          >
            Let's Go
          </button>
        </form>

        <p className='my-3 text-center text-gray-400'>
          New User? <Link to={"/register"} className='text-gray-200 hover:text-gray-100 font-semibold'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
