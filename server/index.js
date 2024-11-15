const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')

// Use updated CORS configuration
console.log('CORS Origin:', process.env.FRONTEND_URL);
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Make sure the correct frontend URL is used here
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowing methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowing headers
    credentials: true  // Allow credentials like cookies
}));

// Parsing middleware
app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080

// Basic route for checking server status
app.get('/', (request, response) => {
    response.json({
        message: "Server running at " + PORT
    });
});

// API routes
app.use('/api', router);

// Connect to the database and start the server
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("Server running at " + PORT);
    });
}).catch(err => {
    console.error("Database connection error:", err);
});
