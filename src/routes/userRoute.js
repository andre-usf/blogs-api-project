const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', createUser);
router.get('/', validateToken, getAllUsers);

module.exports = router;
