const express = require('express');
const router = express.Router();

// @route   GET /api/market/instruments
// @desc    Get available financial instruments
// @access  Public
router.get('/instruments', async (req, res) => {
  try {
    const instruments = {
      equity: [
        { id: 'nifty50', name: 'Nifty 50 Index Fund', type: 'Index Fund', expenseRatio: 0.1 },
        { id: 'sensex', name: 'Sensex Index Fund', type: 'Index Fund', expenseRatio: 0.1 },
        { id: 'multicap', name: 'Multi-Cap Growth Fund', type: 'Active Fund', expenseRatio: 1.2 }
      ],
      debt: [
        { id: 'liquid', name: 'Liquid Fund', type: 'Liquid Fund', expenseRatio: 0.2 },
        { id: 'corporate', name: 'Corporate Bond Fund', type: 'Debt Fund', expenseRatio: 0.8 },
        { id: 'gilt', name: 'Gilt Fund', type: 'Debt Fund', expenseRatio: 0.6 }
      ],
      gold: [
        { id: 'goldetf', name: 'Gold ETF', type: 'ETF', expenseRatio: 0.5 },
        { id: 'goldfund', name: 'Gold Fund', type: 'Fund of Funds', expenseRatio: 1.0 }
      ],
      elss: [
        { id: 'elss1', name: 'ELSS Tax Saver Fund', type: 'ELSS', expenseRatio: 1.5 }
      ]
    };

    res.json({
      success: true,
      instruments
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/market/quotes
// @desc    Get current market quotes
// @access  Public
router.get('/quotes', async (req, res) => {
  try {
    const { symbols } = req.query;
    
    // TODO: Integrate with real market data API
    const quotes = {
      'NIFTY50': { price: 19500, change: 150, changePercent: 0.78 },
      'SENSEX': { price: 64500, change: 450, changePercent: 0.70 },
      'GOLD': { price: 58000, change: 200, changePercent: 0.35 }
    };

    res.json({
      success: true,
      quotes
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;







