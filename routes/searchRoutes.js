const express = require('express');
const { searchGoogle } = require('../controllers/searchController');

const router = express.Router();

// Route to handle Google search with query parameter
router.get('/search', searchGoogle);

module.exports = router;
