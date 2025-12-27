const express = require('express');
const { login, register, getUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users', getUsers);

module.exports = router;