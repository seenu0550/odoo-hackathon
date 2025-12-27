const express = require('express');
const { getUserRequests, createRequest } = require('../controllers/requestController');

const router = express.Router();

router.get('/:userId', getUserRequests);
router.post('/', createRequest);

module.exports = router;