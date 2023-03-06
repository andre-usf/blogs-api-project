const express = require('express');
const { getAllPosts } = require('../controllers/postController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, getAllPosts);

module.exports = router;