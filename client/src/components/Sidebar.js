import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar';
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from './SearchUser';
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { logout } from '../redux/userSlice';

const Sidebar = () => {
    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);
    const socketConnection = useSelector(state => state?.user?.socketConnection);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('sidebar', user._id);
            
            socketConnection.on('conversation', (data) => {
                console.log('conversation', data);
                
                const conversationUserData = data.map((conversationUser) => {
                    if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser?.sender
                        };
                    } else if (conversationUser?.receiver?._id !== user?._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.receiver
                        };
                    } else {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.sender
                        };
                    }
                });

                setAllUser(conversationUserData);
            });
        }
    }, [socketConnection, user]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/email");
        localStorage.clear();
    };

    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-gray-900 text-white'>
            {/* Sidebar (left) */}
            <div className='bg-gray-800 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-gray-400 flex flex-col justify-between'>
                <div>
                    {/* Chat Button */}
                    <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-700 rounded ${isActive && "bg-gray-700"}`} title='chat'>
                        <IoChatbubbleEllipses size={20} />
                    </NavLink>

                    {/* Add Friend Button */}
                    <div title='add friend' onClick={() => setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-700 rounded'>
                        <FaUserPlus size={20} />
                    </div>
                </div>

                {/* User Avatar & Logout */}
                <div className='flex flex-col items-center'>
                    <button className='mx-auto' title={user?.name} onClick={() => setEditUserOpen(true)}>
                        <Avatar width={40} height={40} name={user?.name} imageUrl={user?.profile_pic} userId={user?._id} />
                    </button>
                    <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-700 rounded' onClick={handleLogout}>
                        <BiLogOut size={20} />
                    </button>
                </div>
            </div>

            {/* Content (right) */}
            <div className='w-full'>
                <div className='h-16 flex items-center'>
                    <h2 className='text-xl font-bold p-4 text-white'>Message</h2>
                </div>
                <div className='bg-gray-700 p-[0.5px]'></div>

                <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                    {/* No Conversations */}
                    {allUser.length === 0 && (
                        <div className='mt-12'>
                            <div className='flex justify-center items-center my-4 text-gray-500'>
                                <FiArrowUpLeft size={50} />
                            </div>
                            <p className='text-lg text-center text-gray-400'>Explore users to start a conversation with.</p>
                        </div>
                    )}

                    {/* Conversations List */}
                    {allUser.map((conv) => (
                        <NavLink to={`/home/${conv?.userDetails?._id}`} key={conv?._id} className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-gray-700 cursor-pointer'>
                            <div>
                                <Avatar imageUrl={conv?.userDetails?.profile_pic} name={conv?.userDetails?.name} width={40} height={40} />
                            </div>
                            <div>
                                <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
                                <div className='text-gray-500 text-xs flex items-center gap-1'>
                                    <div className='flex items-center gap-1'>
                                        {conv?.lastMsg?.imageUrl && (
                                            <div className='flex items-center gap-1'>
                                                <FaImage size={14} />
                                                {!conv?.lastMsg?.text && <span>Image</span>}
                                            </div>
                                        )}
                                        {conv?.lastMsg?.videoUrl && (
                                            <div className='flex items-center gap-1'>
                                                <FaVideo size={14} />
                                                {!conv?.lastMsg?.text && <span>Video</span>}
                                            </div>
                                        )}
                                    </div>
                                    <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                                </div>
                            </div>
                            {Boolean(conv?.unseenMsg) && (
                                <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Edit User Details Modal */}
            {editUserOpen && (
                <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
            )}

            {/* Search User Modal */}
            {openSearchUser && (
                <SearchUser onClose={() => setOpenSearchUser(false)} />
            )}
        </div>
    );
};

export default Sidebar;
