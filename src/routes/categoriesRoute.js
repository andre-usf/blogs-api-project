const express = require('express');
const { createCategory } = require('../controllers/categoriesController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, createCategory);

module.exports = router;
