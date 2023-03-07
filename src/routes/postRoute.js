const express = require('express');
const { 
  getAllPosts, 
  getPostById, 
  createPost, 
  updatePost,
  deletePost,
  getPostsBySearch,
} = require('../controllers/postController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, getAllPosts);
router.get('/search', validateToken, getPostsBySearch);
router.get('/:id', validateToken, getPostById);
router.post('/', validateToken, createPost);
router.put('/:id', validateToken, updatePost);
router.delete('/:id', validateToken, deletePost);

module.exports = router;