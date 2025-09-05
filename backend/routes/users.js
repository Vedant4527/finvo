const express = require('express');
const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    // TODO: Get user from database
    const profile = {
      id: 'user-1',
      name: 'Demo User',
      email: 'demo@finvo.com',
      phone: '+91-9876543210',
      age: 30,
      income: 800000,
      savings: 200000,
      riskTolerance: 'medium',
      investmentHorizon: 10,
      goals: ['retirement', 'house'],
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      profile
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', async (req, res) => {
  try {
    const updates = req.body;
    
    // TODO: Update user in database
    
    res.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;







