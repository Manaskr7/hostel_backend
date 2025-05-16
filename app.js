const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.use('/allotments', require('./routes/allotmentRoutes'));
app.use('/messdeduction',require('./routes/messDeductionRoutes'));


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
