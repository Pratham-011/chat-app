Here is the demo video link: https://youtu.be/RLf01UWWlR0

Here is the deployed link: https://leafy-fudge-1f2790.netlify.app

Chat App with React, Socket.io, Node.js, Redux-Toolkit, and MongoDB (2024)

This project demonstrates how a real-time messaging Chat App using React for the frontend, Socket.io for real-time communication, Node.js for the backend, Redux-Toolkit for state management, and MongoDB for database operations.

Features
Real-time messaging using Socket.io.
Authentication using JWT.
State management with Redux-Toolkit.
Image uploading with Cloudinary.
Fully responsive frontend using React.

Installation and Setup
Server

Navigate to the server directory:

bash

cd server
Install dependencies:

bash

npm install
Start the server using nodemon (recommended for development) or node:

bash
nodemon index.js

or

bash
node index.js

Client
Navigate to the client directory:

bash
cd client
Install dependencies:

bash
npm install
Start the React development server:

bash
Copy code
npm start

Environment Variables

Server .env File
env
FRONTEND_URL = <Frontend URL>
MONGODB_URI = <MongoDB URI>
JWT_SECRET_KEY = <JWT Secret Key>
Replace <Frontend URL>, <MongoDB URI>, and <JWT Secret Key> with your actual values.

Client .env File
env
REACT_APP_CLOUDINARY_CLOUD_NAME = <Cloudinary Cloud Name>
REACT_APP_BACKEND_URL = <Backend URL>
Replace <Cloudinary Cloud Name> and <Backend URL> with your actual values.

Project Structure
Server
Technologies: Node.js, Express, MongoDB, Socket.io.
Key Features: API endpoints for authentication, user management, and real-time communication.

Client
Technologies: React, Redux-Toolkit, Socket.io-client, Cloudinary.
Key Features: Real-time chat interface, user authentication, and state management.
Requirements
Node.js (v16 or above)
MongoDB (local or cloud-based, such as MongoDB Atlas)
NPM or Yarn
