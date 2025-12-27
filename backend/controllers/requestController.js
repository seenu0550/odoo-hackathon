const Request = require('../models/Request');
const Equipment = require('../models/Equipment');

const getUserRequests = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const userRequests = await Request.find({ userId });
    res.json(userRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRequest = async (req, res) => {
  try {
    const { equipmentId, description, priority, userId } = req.body;
    const selectedEquip = await Equipment.findById(equipmentId);
    
    const newRequest = new Request({
      equipment: selectedEquip?.name || '',
      type: 'Corrective',
      status: 'New',
      date: new Date().toISOString().split('T')[0],
      description,
      priority,
      userId: parseInt(userId)
    });
    
    await newRequest.save();
    res.json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserRequests, createRequest };