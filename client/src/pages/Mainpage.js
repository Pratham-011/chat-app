import React from "react";
import { Link } from "react-router-dom";

export default function Mainpage() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
      InstantTalk Chat-App for Seamless Conversations
      </h1>
      <p className="text-xl text-gray-600 mb-8">
      InstantTalk makes it effortless to create secure chats 
        conversations in seconds.
      </p>
      <Link to="/email">
      <button  className='border-black border text-black px-6 py-3 rounded hover:bg-black hover:text-white '>Start Chatting</button>

      </Link>

      <div className="mt-12 w-full max-w-5xl flex justify-center">
        {/* Placeholder for Illustration/Image */}
        <img
          src="/images/conversation.svg"
          alt="Illustration"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}