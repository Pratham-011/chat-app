import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  });
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPhoto = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const uploadedPhoto = await uploadFile(file);
      console.log("Uploaded photo:", uploadedPhoto);

      setUploadPhoto(file);
      setData((prev) => ({
        ...prev,
        profile_pic: uploadedPhoto?.url || ""
      }));
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("Failed to upload file.");
    }
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
    setData((prev) => ({
      ...prev,
      profile_pic: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        });
        navigate('/email');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className='h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center'>
      <div className='bg-gray-700 shadow-lg rounded-lg w-full max-w-md p-8 overflow-hidden'>
        <h3 className='text-center font-semibold text-2xl text-gray-200'>Welcome to Chat App!</h3>

        <form className='grid gap-6 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-gray-300'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              className='border border-gray-500 rounded-md px-4 py-2 bg-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400'
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

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

          <div className='flex flex-col gap-1'>
                <label htmlFor='profile_pic' className='text-gray-300'>Photo :

                  <div className='border border-gray-500 rounded-md px-4 py-4 bg-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer'>
                      <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                        }
                      </p>
                      {
                        uploadPhoto?.name && (
                          <button  onClick={handleClearUploadPhoto}>
                            <IoClose/>
                          </button>
                        )
                      }
                      
                  </div>
                
                </label>
                
                <input
                  type='file'
                  id='profile_pic'
                  name='profile_pic'
                  className= ' hidden'
                  onChange={handleUploadPhoto}
                />
              </div>


          <button
            className='bg-gray-800 text-lg px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 font-bold text-white leading-relaxed tracking-wide'
          >
            Register
          </button>
        </form>

        <p className='my-3 text-center text-gray-400'>
          Already have an account? <Link to={"/email"} className='text-gray-200 hover:text-gray-100 font-semibold'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
