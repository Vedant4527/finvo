// Portfolio calculation and display logic
let portfolioData = {};
let chart = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Get portfolio data from localStorage or URL parameters
    loadPortfolioData();
    
    // Calculate and display portfolio
    calculatePortfolio();
    
    // Initialize chart
    initializeChart();
    
    // Update UI
    updateUI();
});

// Load portfolio data from localStorage
function loadPortfolioData() {
    const storedData = localStorage.getItem('finvoPortfolioData');
    if (storedData) {
        portfolioData = JSON.parse(storedData);
    } else {
        // Default data if none exists
        portfolioData = {
            name: 'John Doe',
            email: 'john@example.com',
            salary: 800000,
            savings: 25000,
            risk: 'moderate',
            goals: 'wealth',
            timestamp: new Date().toISOString()
        };
    }
}

// Calculate portfolio allocation based on user data
function calculatePortfolio() {
    const monthlySavings = portfolioData.savings;
    const annualSalary = portfolioData.salary;
    const riskLevel = portfolioData.risk;
    const goal = portfolioData.goals;
    
    // Calculate total investable amount (6 months of savings)
    const totalInvestment = monthlySavings * 6;
    
    // Define allocation percentages based on risk level and goals
    let allocation = {};
    
    switch(riskLevel) {
        case 'conservative':
            allocation = {
                equity: 0.20,
                mutualFunds: 0.30,
                gold: 0.15,
                governmentBonds: 0.25,
                highLiquidFund: 0.05,
                savingsBalance: 0.05
            };
            break;
        case 'moderate':
            allocation = {
                equity: 0.35,
                mutualFunds: 0.25,
                gold: 0.10,
                governmentBonds: 0.20,
                highLiquidFund: 0.05,
                savingsBalance: 0.05
            };
            break;
        case 'aggressive':
            allocation = {
                equity: 0.50,
                mutualFunds: 0.20,
                gold: 0.10,
                governmentBonds: 0.10,
                highLiquidFund: 0.05,
                savingsBalance: 0.05
            };
            break;
        default:
            allocation = {
                equity: 0.35,
                mutualFunds: 0.25,
                gold: 0.10,
                governmentBonds: 0.20,
                highLiquidFund: 0.05,
                savingsBalance: 0.05
            };
    }
    
    // Adjust allocation based on goals
    if (goal === 'retirement') {
        allocation.equity += 0.05;
        allocation.governmentBonds -= 0.05;
    } else if (goal === 'house') {
        allocation.highLiquidFund += 0.05;
        allocation.equity -= 0.05;
    } else if (goal === 'education') {
        allocation.mutualFunds += 0.05;
        allocation.governmentBonds -= 0.05;
    }
    
    // Calculate amounts
    const portfolio = {
        totalInvestment: totalInvestment,
        equity: Math.round(totalInvestment * allocation.equity),
        mutualFunds: Math.round(totalInvestment * allocation.mutualFunds),
        gold: Math.round(totalInvestment * allocation.gold),
        governmentBonds: Math.round(totalInvestment * allocation.governmentBonds),
        highLiquidFund: Math.round(totalInvestment * allocation.highLiquidFund),
        savingsBalance: Math.round(totalInvestment * allocation.savingsBalance),
        allocation: allocation,
        riskLevel: riskLevel,
        goal: goal
    };
    
    // Store calculated portfolio
    localStorage.setItem('finvoCalculatedPortfolio', JSON.stringify(portfolio));
    
    return portfolio;
}

// Initialize Chart.js pie chart
function initializeChart() {
    const portfolio = JSON.parse(localStorage.getItem('finvoCalculatedPortfolio'));
    if (!portfolio) return;
    
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Equity', 'Mutual Funds', 'Gold', 'Government Bonds', 'High-Liquid Fund', 'Savings Balance'],
            datasets: [{
                data: [
                    portfolio.equity,
                    portfolio.mutualFunds,
                    portfolio.gold,
                    portfolio.governmentBonds,
                    portfolio.highLiquidFund,
                    portfolio.savingsBalance
                ],
                backgroundColor: [
                    '#3B82F6', // Blue
                    '#10B981', // Green
                    '#F59E0B', // Yellow
                    '#8B5CF6', // Purple
                    '#6366F1', // Indigo
                    '#6B7280'  // Gray
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Update UI with portfolio data
function updateUI() {
    const portfolio = JSON.parse(localStorage.getItem('finvoCalculatedPortfolio'));
    if (!portfolio) return;
    
    // Update amounts
    document.getElementById('equity-amount').textContent = `₹${portfolio.equity.toLocaleString()}`;
    document.getElementById('mutual-funds-amount').textContent = `₹${portfolio.mutualFunds.toLocaleString()}`;
    document.getElementById('gold-amount').textContent = `₹${portfolio.gold.toLocaleString()}`;
    document.getElementById('bonds-amount').textContent = `₹${portfolio.governmentBonds.toLocaleString()}`;
    document.getElementById('liquid-amount').textContent = `₹${portfolio.highLiquidFund.toLocaleString()}`;
    document.getElementById('savings-amount').textContent = `₹${portfolio.savingsBalance.toLocaleString()}`;
    
    // Update total investment
    document.getElementById('total-investment').textContent = `₹${portfolio.totalInvestment.toLocaleString()}`;
    
    // Update risk profile
    updateRiskProfile(portfolio.riskLevel);
    
    // Update expected returns
    updateExpectedReturns(portfolio.riskLevel);
}

// Update risk profile display
function updateRiskProfile(riskLevel) {
    const riskConfig = {
        conservative: {
            level: 'Conservative',
            width: '30%',
            description: 'Low risk approach with stable returns and capital preservation focus'
        },
        moderate: {
            level: 'Moderate',
            width: '60%',
            description: 'Balanced approach with moderate risk and growth potential'
        },
        aggressive: {
            level: 'Aggressive',
            width: '90%',
            description: 'High growth potential with higher risk tolerance'
        }
    };
    
    const config = riskConfig[riskLevel] || riskConfig.moderate;
    
    document.getElementById('risk-level').textContent = config.level;
    document.getElementById('risk-bar').style.width = config.width;
    document.getElementById('risk-description').textContent = config.description;
}

// Update expected returns based on risk level
function updateExpectedReturns(riskLevel) {
    const returns = {
        conservative: {
            '1y': '6-8%',
            '3y': '8-10%',
            '5y': '10-12%'
        },
        moderate: {
            '1y': '8-12%',
            '3y': '10-15%',
            '5y': '12-18%'
        },
        aggressive: {
            '1y': '12-18%',
            '3y': '15-22%',
            '5y': '18-25%'
        }
    };
    
    const config = returns[riskLevel] || returns.moderate;
    
    document.getElementById('return-1y').textContent = config['1y'];
    document.getElementById('return-3y').textContent = config['3y'];
    document.getElementById('return-5y').textContent = config['5y'];
}

// Navigation functions
function goToDashboard() {
    window.location.href = 'dashboard.html';
}

function logout() {
    // Clear stored data
    localStorage.removeItem('finvoPortfolioData');
    localStorage.removeItem('finvoCalculatedPortfolio');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Action functions
function downloadPortfolio() {
    const portfolio = JSON.parse(localStorage.getItem('finvoCalculatedPortfolio'));
    if (!portfolio) return;
    
    // Create a simple text report
    const report = `
FINVO PMS - Portfolio Report
Generated on: ${new Date().toLocaleDateString()}

Total Investment: ₹${portfolio.totalInvestment.toLocaleString()}

Portfolio Allocation:
- Equity: ₹${portfolio.equity.toLocaleString()} (${(portfolio.allocation.equity * 100).toFixed(1)}%)
- Mutual Funds: ₹${portfolio.mutualFunds.toLocaleString()} (${(portfolio.allocation.mutualFunds * 100).toFixed(1)}%)
- Gold: ₹${portfolio.gold.toLocaleString()} (${(portfolio.allocation.gold * 100).toFixed(1)}%)
- Government Bonds: ₹${portfolio.governmentBonds.toLocaleString()} (${(portfolio.allocation.governmentBonds * 100).toFixed(1)}%)
- High-Liquid Fund: ₹${portfolio.highLiquidFund.toLocaleString()} (${(portfolio.allocation.highLiquidFund * 100).toFixed(1)}%)
- Savings Balance: ₹${portfolio.savingsBalance.toLocaleString()} (${(portfolio.allocation.savingsBalance * 100).toFixed(1)}%)

Risk Level: ${portfolio.riskLevel.charAt(0).toUpperCase() + portfolio.riskLevel.slice(1)}
Financial Goal: ${portfolio.goal.charAt(0).toUpperCase() + portfolio.goal.slice(1)}
    `;
    
    // Create and download file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finvo-portfolio-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function modifyPortfolio() {
    // Redirect to home page to modify data
    window.location.href = 'index.html';
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatPercentage(value) {
    return `${(value * 100).toFixed(1)}%`;
}

// Export functions for global access
window.goToDashboard = goToDashboard;
window.logout = logout;
window.downloadPortfolio = downloadPortfolio;
window.modifyPortfolio = modifyPortfolio;





