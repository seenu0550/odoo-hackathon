const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  team: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Active', enum: ['Active', 'Under Maintenance', 'Out of Service'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Equipment', equipmentSchema);