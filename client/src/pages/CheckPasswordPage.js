import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

const CheckPasswordPage = () => {
  const [data, setData] = useState({ password: "", userId: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email');
    }
  }, [location, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios.post(URL, {
        userId: location?.state?._id,
        password: data.password,
      }, { withCredentials: true });

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem('token', response?.data?.token);
        setData({ password: "" });
        navigate('/home');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className='h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center'>
      <div className='bg-gray-700 shadow-lg rounded-lg w-full max-w-md p-8 overflow-hidden'>
        <div className='flex flex-col items-center mb-6'>
          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
            className="rounded-full" // Ensure avatar is circular
          />
          <h2 className='font-semibold text-lg mt-2 text-center text-gray-200'>{location?.state?.name}</h2>
        </div>

        <form className='grid gap-6' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-gray-300'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='border border-gray-500 rounded-md px-4 py-2 bg-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-gray-800 text-lg px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 font-bold text-white leading-relaxed tracking-wide'
          >
            Login
          </button>
        </form>

        <p className='my-3 text-center text-gray-400'>
          <Link to={"/forgot-password"} className='text-gray-200 hover:text-gray-100 font-semibold'>Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
