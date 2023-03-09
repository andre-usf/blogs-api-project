const express = require('express');
const { 
  createUser, 
  getAllUsers, 
  getUserById, 
  deleteUser,
} = require('../controllers/userController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', createUser);

router.get('/', validateToken, getAllUsers);

router.get('/:id', validateToken, getUserById);

router.delete('/me', validateToken, deleteUser);

module.exports = router;
