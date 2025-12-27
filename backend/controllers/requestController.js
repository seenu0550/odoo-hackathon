const Request = require('../models/Request');
const Equipment = require('../models/Equipment');

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('userId', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserRequests = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userRequests = await Request.find({ userId });
    res.json(userRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllRequests, getUserRequests, createRequest, updateRequest, deleteRequest };