const Equipment = require('../models/Equipment');

const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEquipmentById = async (req, res) => {
  try {
    const equipmentItem = await Equipment.findById(req.params.id);
    
    if (equipmentItem) {
      res.json(equipmentItem);
    } else {
      res.status(404).json({ error: 'Equipment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    const savedEquipment = await equipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllEquipment, getEquipmentById, createEquipment, updateEquipment, deleteEquipment };