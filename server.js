const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const matchRoutes = require('./routes/matchRoutes');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes'); // Add ticketRoutes
const footballRoutes = require('./routes/footballerRoutes'); // Import football routes
const buyingTicketRoutes = require('./routes/buyingTicketRoutes'); // Import buying ticket route

const app = express();

dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/buying-tickets', buyingTicketRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/footballers', footballRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
