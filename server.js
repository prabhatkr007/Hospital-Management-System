const express = require('express')
const mongoose = require("mongoose");
const patientsRouter = require("./routes/patients");
const userRouter = require('./routes/users');
const doctorsRouter = require('./routes/doctors')
const dotenv = require('dotenv');
const path = require('path');
const authMiddleware = require("./middleware/auth");
const appointmentRoutes = require("./routes/appointments");
const app = express();

dotenv.config({path: './config.env'});

require('./DB/conn.js');

// Middleware for parsing and URL encoding
app.use(express.json());


// Routes for patients
app.use('/api/patients', patientsRouter);

// Routes for doctors
app.use('/api/doctors', doctorsRouter)

// Routes for users
app.use('/api/users', userRouter);

// Routes for appointment
app.use("/api/appointments", authMiddleware, appointmentRoutes);

// Start server
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});