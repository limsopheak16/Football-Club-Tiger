const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const ticketRoutes = require ('./routes/ticketRoutes');
// const { useRoutes } = require('react-router-dom');
dotenv.config(); 

const app = express();


app.use(express.json());
app.use(cors());
app.use ('/api/tickets',ticketRoutes);

connectDB();

app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
