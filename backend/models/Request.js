const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  equipment: { type: String, required: true },
  task: { type: String, required: true },
  assignedTo: { type: String, required: true },
  dueDate: { type: String, required: true },
  frequency: { type: String, required: true },
  type: { type: String, default: 'Corrective', enum: ['Preventive', 'Corrective'] },
  status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Completed'] },
  description: { type: String, required: true },
  priority: { type: String, required: true, enum: ['Low', 'Medium', 'High'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);