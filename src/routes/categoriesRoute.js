const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoriesController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, createCategory);
router.get('/', validateToken, getAllCategories);

module.exports = router;
