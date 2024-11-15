const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');
const { app, server } = require('./socket/index'); // Adjust this as necessary

// Initialize Express app
const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Ensure this is set correctly in your .env
    
    credentials: true // Allow credentials if needed
}));

// Middleware
app.use(express.json());
app.use(cookiesParser());

// Handle preflight requests for all routes
app.options('*', cors());

// Set the port
const PORT = process.env.PORT || 8080;

// Basic route for checking server status
app.get('/', (request, response) => {
    response.json({
        message: "Server running at " + PORT
    });
});

// API endpoints
app.use('/api', router);

// Connect to the database and start the server
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("Server running at " + PORT);
    });
}).catch(err => {
    console.error("Database connection error:", err);
});
