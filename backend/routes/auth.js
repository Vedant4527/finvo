const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  body('phone', 'Phone number is required').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    // TODO: Check if user already exists
    // TODO: Create user in database
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create JWT token
    const payload = {
      user: {
        id: 'temp-id', // TODO: Replace with actual user ID
        email: email
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'finvo-secret-key',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: 'temp-id',
            name,
            email,
            phone
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // TODO: Check if user exists
    // TODO: Verify password
    
    // For now, return mock response
    const payload = {
      user: {
        id: 'temp-id',
        email: email
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'finvo-secret-key',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: 'temp-id',
            name: 'Demo User',
            email
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/auth/user
// @desc    Get current user
// @access  Private
router.get('/user', async (req, res) => {
  try {
    // TODO: Implement auth middleware
    // TODO: Get user from database
    
    res.json({
      user: {
        id: 'temp-id',
        name: 'Demo User',
        email: 'demo@finvo.com'
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;







