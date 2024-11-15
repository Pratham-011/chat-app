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
const cors = require('cors');

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow access
        } else {
            callback(new Error('Not allowed by CORS')); // Reject other origins
        }
    },
    credentials: true, // Allow credentials if needed (e.g., cookies)
}));


// Middleware
app.use(express.json());
app.use(cookiesParser());

// Handle preflight requests for all routes
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204); // No Content
});


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
