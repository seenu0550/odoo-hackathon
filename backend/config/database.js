const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://gjssai17_db_user:%24Srinivas%24%2617@tracker-database.bptzypx.mongodb.net/?appName=Tracker-database');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;