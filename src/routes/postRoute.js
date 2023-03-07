const express = require('express');
const { getAllPosts, getPostById, createPost } = require('../controllers/postController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, getAllPosts);
router.get('/:id', validateToken, getPostById);
router.post('/', validateToken, createPost);

module.exports = router;