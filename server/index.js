const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');

// Initialize Express app
const app = express();

// Log the CORS origin for debugging
console.log('CORS Origin:', process.env.FRONTEND_URL);

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Ensure this is correct
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // Allow credentials if needed
}));

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
    app.listen(PORT, () => { // Use app.listen instead of server.listen if socket.io isn't needed
        console.log("Server running at " + PORT);
    });
}).catch(err => {
    console.error("Database connection error:", err);
});
