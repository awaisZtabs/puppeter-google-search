require('dotenv').config(); // Load environment variables if any
const express = require('express');
const searchRoutes = require('./routes/searchRoutes'); // Import routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', searchRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
