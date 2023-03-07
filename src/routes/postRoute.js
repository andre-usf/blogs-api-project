const express = require('express');
const { 
  getAllPosts, 
  getPostById, 
  createPost, 
  updatePost,
} = require('../controllers/postController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, getAllPosts);
router.get('/:id', validateToken, getPostById);
router.post('/', validateToken, createPost);
router.put('/:id', validateToken, updatePost);

module.exports = router;