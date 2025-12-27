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

module.exports = { getAllEquipment, getEquipmentById };