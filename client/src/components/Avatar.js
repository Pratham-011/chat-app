import React from 'react';
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector(state => state?.user?.onlineUser);

  let avatarName = "";

  if (name) {
    const splitName = name.split(" ");
    avatarName = splitName.length > 1 ? splitName[0][0] + splitName[1][0] : splitName[0][0];
  }

  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-gray-200',
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200"
  ];

  const randomNumber = Math.floor(Math.random() * bgColor.length);
  const isOnline = onlineUser.includes(userId);

  return (
    <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="rounded-full object-cover w-full h-full"
        />
      ) : name ? (
        <div className={`rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]} w-full h-full`}>
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}
      {isOnline && (
        <div className='bg-green-600 p-1 absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 z-10 rounded-full'></div>
      )}
    </div>
  );
};

export default Avatar;
