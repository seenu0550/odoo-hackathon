const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  equipment: { type: String, required: true },
  type: { type: String, default: 'Corrective' },
  status: { type: String, default: 'New' },
  date: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  userId: { type: Number, required: true }
});

module.exports = mongoose.model('Request', requestSchema);