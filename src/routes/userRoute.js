const express = require('express');
const { createUser, getAllUsers, getUserById } = require('../controllers/userController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', createUser);
router.get('/', validateToken, getAllUsers);
router.get('/:id', validateToken, getUserById);

module.exports = router;
