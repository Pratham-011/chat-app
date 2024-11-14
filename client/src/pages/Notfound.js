
import { Link } from "react-router-dom";
import React from "react";

export default function Notfound () {
    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <img src="/images/404.svg" width={500} height={500} alt="404" img/>
            <Link to="/">
            <button  className='border-black border text-black px-6 py-3 rounded hover:bg-black hover:text-white '>Back To Home </button>

            </Link>
        </div>
    )
}