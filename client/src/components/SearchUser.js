import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast'
import axios from 'axios';
import { IoClose } from "react-icons/io5";

const SearchUser = ({ onClose }) => {
    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const handleSearchUser = async () => {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;
        try {
            setLoading(true);
            const response = await axios.post(URL, {
                search: search
            });
            setLoading(false);
            setSearchUser(response.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        if (search) {
            handleSearchUser();
        }
    }, [search]);

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 p-4 z-10'>
            <div className='w-full max-w-lg mx-auto mt-10'>
                {/* Search input field */}
                <div className='bg-gray-800 rounded-xl h-14 flex items-center px-4 mb-4'>
                    <input
                        type='text'
                        placeholder='Search user by name, email...'
                        className='w-full bg-transparent text-white placeholder-gray-400 focus:outline-none py-1 px-2'
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <IoSearchOutline size={25} className='text-gray-400 ml-2' />
                </div>

                {/* Results container */}
                <div className='bg-gray-800 rounded-xl w-full p-4 max-h-[70vh] overflow-y-auto'>
                    {/* No user found */}
                    {searchUser.length === 0 && !loading && (
                        <p className='text-center text-gray-500'>No user found!</p>
                    )}

                    {/* Loading state */}
                    {loading && (
                        <div className='flex justify-center'>
                            <Loading />
                        </div>
                    )}

                    {/* Display search results */}
                    {searchUser.length > 0 && !loading && (
                        searchUser.map((user) => (
                            <UserSearchCard key={user._id} user={user} onClose={onClose} />
                        ))
                    )}
                </div>
            </div>

            {/* Close button */}
            <div className='absolute top-2 right-2 text-3xl text-gray-400 hover:text-white cursor-pointer' onClick={onClose}>
                <IoClose />
            </div>
        </div>
    )
}

export default SearchUser;
