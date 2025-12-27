const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  team: { type: String, required: true }
});

module.exports = mongoose.model('Equipment', equipmentSchema);