const express = require('express');
const { getAllRequests, getUserRequests, createRequest, updateRequest, deleteRequest } = require('../controllers/requestController');

const router = express.Router();

router.get('/', getAllRequests);
router.get('/user/:userId', getUserRequests);
router.post('/', createRequest);
router.put('/:id', updateRequest);
router.delete('/:id', deleteRequest);

module.exports = router;