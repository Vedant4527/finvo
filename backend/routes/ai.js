const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// @route   POST /api/ai/recommend-portfolio
// @desc    Get AI-powered portfolio recommendations
// @access  Private
router.post('/recommend-portfolio', [
  body('userProfile', 'User profile is required').isObject(),
  body('financialGoals', 'Financial goals are required').isArray(),
  body('constraints', 'Investment constraints are required').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userProfile, financialGoals, constraints } = req.body;
    const { age, income, savings, riskTolerance, investmentHorizon } = userProfile;

    // TODO: Implement actual AI recommendation engine
    // For now, use rule-based logic
    let recommendedAllocation = {};
    let expectedReturn = 0;
    let riskLevel = 'medium';

    // Age-based allocation (100 - age rule)
    const equityAllocation = Math.max(20, Math.min(80, 100 - age));
    
    // Risk tolerance adjustment
    let riskMultiplier = 1;
    switch (riskTolerance) {
      case 'low':
        riskMultiplier = 0.7;
        riskLevel = 'low';
        break;
      case 'high':
        riskMultiplier = 1.3;
        riskLevel = 'high';
        break;
      default:
        riskMultiplier = 1;
    }

    recommendedAllocation = {
      equity: Math.min(80, Math.round(equityAllocation * riskMultiplier)),
      debt: Math.max(10, Math.round((100 - equityAllocation) * (2 - riskMultiplier))),
      gold: 5,
      cash: Math.max(5, 100 - (recommendedAllocation.equity + recommendedAllocation.debt + 5))
    };

    // Calculate expected return based on allocation
    expectedReturn = (
      (recommendedAllocation.equity * 12) +
      (recommendedAllocation.debt * 7) +
      (recommendedAllocation.gold * 8) +
      (recommendedAllocation.cash * 4)
    ) / 100;

    // Goal-specific adjustments
    const goalAdjustments = financialGoals.map(goal => {
      switch (goal.type) {
        case 'retirement':
          return { equity: 5, debt: -5 };
        case 'house':
          return { equity: -5, debt: 5 };
        case 'education':
          return { equity: -3, debt: 3 };
        case 'emergency':
          return { equity: -10, cash: 10 };
        default:
          return { equity: 0, debt: 0 };
      }
    });

    // Apply goal adjustments
    goalAdjustments.forEach(adjustment => {
      recommendedAllocation.equity += adjustment.equity || 0;
      recommendedAllocation.debt += adjustment.debt || 0;
      recommendedAllocation.cash += adjustment.cash || 0;
    });

    // Normalize to 100%
    const total = Object.values(recommendedAllocation).reduce((sum, val) => sum + val, 0);
    Object.keys(recommendedAllocation).forEach(key => {
      recommendedAllocation[key] = Math.round((recommendedAllocation[key] / total) * 100);
    });

    const recommendation = {
      allocation: recommendedAllocation,
      expectedReturn: Math.round(expectedReturn * 100) / 100,
      riskLevel,
      reasoning: {
        ageBased: `Based on your age (${age}), we recommend ${equityAllocation}% equity allocation`,
        riskBased: `Your ${riskTolerance} risk tolerance adjusts this by ${riskMultiplier}x`,
        goalBased: `Goals: ${financialGoals.map(g => g.type).join(', ')}`,
        constraints: `Considering your constraints: ${Object.keys(constraints).join(', ')}`
      },
      suggestedFunds: generateFundSuggestions(recommendedAllocation),
      rebalancingSchedule: 'Quarterly',
      taxOptimization: generateTaxOptimization(recommendedAllocation)
    };

    res.json({
      success: true,
      recommendation
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/ai/chat
// @desc    AI financial advisor chat
// @access  Private
router.post('/chat', [
  body('message', 'Message is required').not().isEmpty(),
  body('context', 'User context is required').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, context } = req.body;

    // TODO: Integrate with actual AI chat model (GPT, Claude, etc.)
    // For now, provide rule-based responses
    const response = generateAIResponse(message, context);

    res.json({
      success: true,
      response: {
        message: response.message,
        suggestions: response.suggestions,
        confidence: response.confidence,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/ai/optimize
// @desc    Optimize existing portfolio
// @access  Private
router.post('/optimize', [
  body('currentPortfolio', 'Current portfolio is required').isObject(),
  body('optimizationGoals', 'Optimization goals are required').isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPortfolio, optimizationGoals } = req.body;

    // TODO: Implement portfolio optimization algorithm
    const optimization = {
      currentAllocation: currentPortfolio.allocation,
      optimizedAllocation: calculateOptimizedAllocation(currentPortfolio, optimizationGoals),
      improvements: calculateImprovements(currentPortfolio, optimizationGoals),
      actionPlan: generateActionPlan(currentPortfolio, optimizationGoals)
    };

    res.json({
      success: true,
      optimization
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Helper functions
function generateFundSuggestions(allocation) {
  return {
    equity: [
      { name: 'Nifty 50 Index Fund', type: 'Index Fund', expenseRatio: 0.1 },
      { name: 'Multi-Cap Growth Fund', type: 'Active Fund', expenseRatio: 1.2 }
    ],
    debt: [
      { name: 'Liquid Fund', type: 'Liquid Fund', expenseRatio: 0.2 },
      { name: 'Corporate Bond Fund', type: 'Debt Fund', expenseRatio: 0.8 }
    ],
    gold: [
      { name: 'Gold ETF', type: 'ETF', expenseRatio: 0.5 }
    ]
  };
}

function generateTaxOptimization(allocation) {
  return {
    suggestions: [
      'Consider ELSS for tax-saving under Section 80C',
      'Use index funds for lower tax on capital gains',
      'Hold equity funds for more than 1 year for LTCG benefits'
    ],
    taxEfficientAllocation: {
      ...allocation,
      elss: Math.min(10, allocation.equity * 0.2)
    }
  };
}

function generateAIResponse(message, context) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('risk') || lowerMessage.includes('safe')) {
    return {
      message: 'Based on your profile, I recommend a balanced approach. Consider diversifying across asset classes to manage risk while maintaining growth potential.',
      suggestions: ['Review your risk tolerance assessment', 'Consider adding debt funds for stability'],
      confidence: 0.85
    };
  } else if (lowerMessage.includes('return') || lowerMessage.includes('profit')) {
    return {
      message: 'Expected returns depend on your asset allocation. Generally, higher equity exposure means higher potential returns but also higher risk.',
      suggestions: ['Check your current allocation', 'Consider rebalancing if needed'],
      confidence: 0.90
    };
  } else if (lowerMessage.includes('tax') || lowerMessage.includes('saving')) {
    return {
      message: 'Tax optimization is crucial for maximizing returns. Consider ELSS funds, index funds, and holding periods for better tax efficiency.',
      suggestions: ['Explore ELSS options', 'Review your holding periods'],
      confidence: 0.88
    };
  } else {
    return {
      message: 'I\'m here to help with your investment decisions. Could you please provide more specific details about your question?',
      suggestions: ['Ask about risk management', 'Inquire about tax optimization', 'Get portfolio recommendations'],
      confidence: 0.70
    };
  }
}

function calculateOptimizedAllocation(portfolio, goals) {
  // Simplified optimization logic
  const current = portfolio.allocation;
  const optimized = { ...current };
  
  goals.forEach(goal => {
    if (goal.type === 'tax_optimization') {
      optimized.equity = Math.min(80, current.equity + 5);
      optimized.debt = Math.max(10, current.debt - 5);
    } else if (goal.type === 'risk_reduction') {
      optimized.equity = Math.max(20, current.equity - 10);
      optimized.debt = Math.min(70, current.debt + 10);
    }
  });
  
  return optimized;
}

function calculateImprovements(portfolio, goals) {
  return {
    expectedReturnImprovement: 0.5,
    riskReduction: 2.0,
    taxEfficiencyImprovement: 15,
    liquidityImprovement: 8
  };
}

function generateActionPlan(portfolio, goals) {
  return [
    {
      action: 'Rebalance portfolio',
      priority: 'High',
      timeline: '1 week',
      impact: 'Medium'
    },
    {
      action: 'Add tax-efficient funds',
      priority: 'Medium',
      timeline: '2 weeks',
      impact: 'High'
    },
    {
      action: 'Review risk allocation',
      priority: 'Low',
      timeline: '1 month',
      impact: 'Medium'
    }
  ];
}

module.exports = router;







