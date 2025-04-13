const Poem = require('../models/Poem');
const { body, validationResult } = require('express-validator');

// Validation rules
exports.validatePoem = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('content').trim().notEmpty().withMessage('Content is required')
];

// Get all poems with search
const getPoems = async (req, res) => {
  try {
    const { search, sort = 'createdAt' } = req.query;
    let query = {};

    // Search in title and content
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const poems = await Poem.find(query)
      .sort({ [sort]: -1 })
      .select('-__v');
      
    res.json({
      status: 'success',
      count: poems.length,
      data: poems
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
};

// Get a single poem by slug
const getPoemBySlug = async (req, res) => {
  try {
    const poem = await Poem.findOne({ slug: req.params.slug }).select('-__v');
    if (!poem) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Poem not found' 
      });
    }
    res.json({
      status: 'success',
      data: poem
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
};

// Create a new poem
const createPoem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'error',
        errors: errors.array() 
      });
    }

    const poem = new Poem(req.body);
    const savedPoem = await poem.save();
    res.status(201).json({
      status: 'success',
      data: savedPoem
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'error',
      message: error.message 
    });
  }
};

// Update a poem
const updatePoem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'error',
        errors: errors.array() 
      });
    }

    const poem = await Poem.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!poem) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Poem not found' 
      });
    }
    
    res.json({
      status: 'success',
      data: poem
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'error',
      message: error.message 
    });
  }
};

// Delete a poem
const deletePoem = async (req, res) => {
  try {
    const poem = await Poem.findOneAndDelete({ slug: req.params.slug });
    if (!poem) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Poem not found' 
      });
    }
    res.json({
      status: 'success',
      message: 'Poem deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
};

module.exports = {
  getPoems,
  getPoemBySlug,
  createPoem,
  updatePoem,
  deletePoem,
  validatePoem
}; 