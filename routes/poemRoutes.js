const express = require('express');
const router = express.Router();
const poemController = require('../controllers/poemController');

// Get all poems (with optional search)
router.get('/', poemController.getPoems);

// Get a single poem by slug
router.get('/:slug', poemController.getPoemBySlug);

// Create a new poem
router.post('/', poemController.validatePoem, poemController.createPoem);

// Update a poem
router.put('/:slug', poemController.validatePoem, poemController.updatePoem);

// Delete a poem
router.delete('/:slug', poemController.deletePoem);

module.exports = router; 