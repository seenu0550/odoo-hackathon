const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const requestRoutes = require('./routes/requests');
const equipmentRoutes = require('./routes/equipment');
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/requests', requestRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});