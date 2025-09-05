const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// @route   POST /api/simulation/scenario
// @desc    Run portfolio simulation with different scenarios
// @access  Private
router.post('/scenario', [
  body('basePortfolio', 'Base portfolio is required').isObject(),
  body('scenarios', 'Scenarios array is required').isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { basePortfolio, scenarios } = req.body;

    // TODO: Implement AI simulation engine
    const simulationResults = scenarios.map((scenario, index) => {
      const { type, parameters } = scenario;
      
      let modifiedPortfolio = { ...basePortfolio };
      let expectedReturn = basePortfolio.expectedReturn;
      let riskLevel = basePortfolio.riskTolerance;

      switch (type) {
        case 'salary_change':
          const salaryChange = parameters.change || 0;
          modifiedPortfolio.investmentAmount *= (1 + salaryChange / 100);
          expectedReturn += salaryChange > 0 ? 0.5 : -0.3;
          break;
        
        case 'market_crash':
          expectedReturn -= 15;
          riskLevel = 'high';
          break;
        
        case 'goal_change':
          const newGoal = parameters.goal;
          modifiedPortfolio.goals.push(newGoal);
          if (newGoal === 'retirement') {
            expectedReturn += 1;
          } else if (newGoal === 'house') {
            expectedReturn -= 0.5;
          }
          break;
        
        case 'risk_adjustment':
          riskLevel = parameters.newRiskLevel;
          if (riskLevel === 'high') {
            expectedReturn += 2;
          } else if (riskLevel === 'low') {
            expectedReturn -= 2;
          }
          break;
      }

      return {
        scenarioId: index + 1,
        scenarioType: type,
        parameters,
        modifiedPortfolio,
        projectedValue: {
          '1_year': modifiedPortfolio.investmentAmount * (1 + expectedReturn / 100),
          '3_years': modifiedPortfolio.investmentAmount * Math.pow(1 + expectedReturn / 100, 3),
          '5_years': modifiedPortfolio.investmentAmount * Math.pow(1 + expectedReturn / 100, 5),
          '10_years': modifiedPortfolio.investmentAmount * Math.pow(1 + expectedReturn / 100, 10)
        },
        riskMetrics: {
          volatility: riskLevel === 'high' ? 18 : riskLevel === 'medium' ? 12 : 8,
          maxDrawdown: riskLevel === 'high' ? -25 : riskLevel === 'medium' ? -15 : -8,
          sharpeRatio: expectedReturn / (riskLevel === 'high' ? 18 : riskLevel === 'medium' ? 12 : 8)
        }
      };
    });

    res.json({
      success: true,
      basePortfolio,
      simulationResults
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/simulation/compare
// @desc    Compare multiple portfolio strategies
// @access  Private
router.post('/compare', [
  body('portfolios', 'Portfolios array is required').isArray({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { portfolios, timeHorizon = 10 } = req.body;

    const comparison = portfolios.map((portfolio, index) => {
      const { name, allocation, expectedReturn, riskTolerance } = portfolio;
      
      const projectedValue = portfolio.investmentAmount * Math.pow(1 + expectedReturn / 100, timeHorizon);
      const volatility = riskTolerance === 'high' ? 18 : riskTolerance === 'medium' ? 12 : 8;
      const sharpeRatio = expectedReturn / volatility;

      return {
        portfolioId: index + 1,
        name,
        allocation,
        expectedReturn,
        riskTolerance,
        projectedValue,
        volatility,
        sharpeRatio,
        riskAdjustedReturn: sharpeRatio,
        taxEfficiency: calculateTaxEfficiency(allocation),
        liquidityScore: calculateLiquidityScore(allocation)
      };
    });

    // Sort by Sharpe ratio for ranking
    comparison.sort((a, b) => b.sharpeRatio - a.sharpeRatio);

    res.json({
      success: true,
      comparison,
      timeHorizon,
      recommendations: {
        bestRiskAdjusted: comparison[0],
        mostConservative: comparison.find(p => p.riskTolerance === 'low'),
        mostAggressive: comparison.find(p => p.riskTolerance === 'high')
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/simulation/monte-carlo
// @desc    Run Monte Carlo simulation for portfolio
// @access  Private
router.post('/monte-carlo', [
  body('portfolio', 'Portfolio is required').isObject(),
  body('simulations', 'Number of simulations is required').isInt({ min: 1000, max: 10000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { portfolio, simulations = 1000, timeHorizon = 10 } = req.body;

    // TODO: Implement actual Monte Carlo simulation
    // For now, generate mock data
    const results = [];
    const { expectedReturn, riskTolerance } = portfolio;
    const volatility = riskTolerance === 'high' ? 18 : riskTolerance === 'medium' ? 12 : 8;

    for (let i = 0; i < simulations; i++) {
      // Simulate random returns based on expected return and volatility
      const annualReturn = expectedReturn + (Math.random() - 0.5) * volatility;
      const finalValue = portfolio.investmentAmount * Math.pow(1 + annualReturn / 100, timeHorizon);
      results.push(finalValue);
    }

    // Calculate percentiles
    results.sort((a, b) => a - b);
    const percentiles = {
      '5th': results[Math.floor(simulations * 0.05)],
      '25th': results[Math.floor(simulations * 0.25)],
      '50th': results[Math.floor(simulations * 0.5)],
      '75th': results[Math.floor(simulations * 0.75)],
      '95th': results[Math.floor(simulations * 0.95)]
    };

    const probabilityOfLoss = results.filter(v => v < portfolio.investmentAmount).length / simulations * 100;

    res.json({
      success: true,
      portfolio,
      simulations,
      timeHorizon,
      results: {
        percentiles,
        probabilityOfLoss,
        expectedValue: results.reduce((sum, val) => sum + val, 0) / simulations,
        minValue: Math.min(...results),
        maxValue: Math.max(...results)
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Helper functions
function calculateTaxEfficiency(allocation) {
  // Higher allocation to tax-efficient instruments like ELSS, ETFs
  const taxEfficientWeight = (allocation.equity || 0) * 0.8 + (allocation.gold || 0) * 0.6;
  return Math.min(100, taxEfficientWeight);
}

function calculateLiquidityScore(allocation) {
  // Higher allocation to liquid instruments
  const liquidWeight = (allocation.cash || 0) + (allocation.equity || 0) * 0.9 + (allocation.debt || 0) * 0.7;
  return Math.min(100, liquidWeight);
}

module.exports = router;







