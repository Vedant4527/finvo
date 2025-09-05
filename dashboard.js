// Dashboard functionality
let growthChart = null;
let allocationChart = null;
let portfolioData = {};
let calculatedPortfolio = {};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeCharts();
    updateDashboard();
    updateLastUpdated();
});

// Load portfolio and user data
function loadData() {
    // Load user data
    const storedUserData = localStorage.getItem('finvoPortfolioData');
    if (storedUserData) {
        portfolioData = JSON.parse(storedUserData);
    }
    
    // Load calculated portfolio
    const storedPortfolio = localStorage.getItem('finvoCalculatedPortfolio');
    if (storedPortfolio) {
        calculatedPortfolio = JSON.parse(storedPortfolio);
    }
}

// Initialize charts
function initializeCharts() {
    initializeGrowthChart();
    initializeAllocationChart();
}

// Initialize portfolio growth chart
function initializeGrowthChart() {
    const ctx = document.getElementById('growthChart').getContext('2d');
    
    // Generate sample growth data (6 months)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const baseAmount = calculatedPortfolio.totalInvestment || 150000;
    const growthData = months.map((month, index) => {
        const growthRate = 1 + (index * 0.02) + (Math.random() * 0.05);
        return Math.round(baseAmount * growthRate);
    });
    
    growthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Portfolio Value',
                data: growthData,
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8B5CF6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Portfolio: ₹${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value / 1000) + 'K';
                        }
                    }
                }
            }
        }
    });
}

// Initialize portfolio allocation chart
function initializeAllocationChart() {
    const ctx = document.getElementById('allocationChart').getContext('2d');
    
    const portfolio = calculatedPortfolio;
    if (!portfolio) return;
    
    allocationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Equity', 'Mutual Funds', 'Gold', 'Government Bonds', 'High-Liquid Fund', 'Savings Balance'],
            datasets: [{
                data: [
                    portfolio.equity || 0,
                    portfolio.mutualFunds || 0,
                    portfolio.gold || 0,
                    portfolio.governmentBonds || 0,
                    portfolio.highLiquidFund || 0,
                    portfolio.savingsBalance || 0
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
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                            return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Update dashboard with current data
function updateDashboard() {
    updateUserInfo();
    updateKeyMetrics();
    updateSIPMetrics();
    updateRiskScore();
    updateCashflowInsights();
}

// Update user information
function updateUserInfo() {
    const userName = portfolioData.name || 'User';
    document.getElementById('user-name').textContent = userName;
}

// Update key metrics
function updateKeyMetrics() {
    const portfolio = calculatedPortfolio;
    if (!portfolio) return;
    
    // Total invested amount
    const totalInvested = portfolio.totalInvestment || 0;
    document.getElementById('total-invested').textContent = `₹${totalInvested.toLocaleString()}`;
    
    // Savings balance
    const savingsBalance = portfolio.savingsBalance || 0;
    document.getElementById('savings-balance').textContent = `₹${savingsBalance.toLocaleString()}`;
    
    // Liquid fund
    const liquidFund = portfolio.highLiquidFund || 0;
    document.getElementById('liquid-fund').textContent = `₹${liquidFund.toLocaleString()}`;
    
    // Calculate total returns (simulated)
    const totalReturns = Math.round(totalInvested * 0.125); // 12.5% return
    document.getElementById('total-returns').textContent = `₹${totalReturns.toLocaleString()}`;
}

// Update SIP metrics
function updateSIPMetrics() {
    const monthlySavings = portfolioData.savings || 25000;
    const currentSIP = Math.round(monthlySavings * 0.6); // 60% of savings
    const recommendedSIP = Math.round(monthlySavings * 0.8); // 80% of savings
    const sipProgress = (currentSIP / recommendedSIP) * 100;
    
    document.getElementById('current-sip').textContent = `₹${currentSIP.toLocaleString()}`;
    document.getElementById('recommended-sip').textContent = `₹${recommendedSIP.toLocaleString()}`;
    document.getElementById('sip-progress').style.width = `${Math.min(sipProgress, 100)}%`;
    
    const progressText = document.querySelector('#sip-progress').parentElement.nextElementSibling;
    progressText.textContent = `${Math.round(sipProgress)}% of recommended SIP amount`;
}

// Update risk score
function updateRiskScore() {
    const riskLevel = portfolioData.risk || 'moderate';
    const riskScores = {
        conservative: 4.5,
        moderate: 7.2,
        aggressive: 9.1
    };
    
    const riskScore = riskScores[riskLevel] || 7.2;
    const riskWidth = (riskScore / 10) * 100;
    
    document.getElementById('risk-score').textContent = riskScore.toFixed(1);
    document.querySelector('#risk-score').parentElement.nextElementSibling.textContent = 
        riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1) + ' Risk';
    document.querySelector('#risk-score').parentElement.nextElementSibling.nextElementSibling.querySelector('.bg-purple-600').style.width = `${riskWidth}%`;
}

// Update cashflow insights
function updateCashflowInsights() {
    const monthlyIncome = portfolioData.salary ? Math.round(portfolioData.salary / 12) : 66667;
    const monthlySavings = portfolioData.savings || 25000;
    const monthlyExpenses = monthlyIncome - monthlySavings;
    
    document.getElementById('monthly-income').textContent = `₹${monthlyIncome.toLocaleString()}`;
    document.getElementById('monthly-expenses').textContent = `₹${monthlyExpenses.toLocaleString()}`;
    document.getElementById('monthly-savings').textContent = `₹${monthlySavings.toLocaleString()}`;
}

// Update last updated timestamp
function updateLastUpdated() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('last-updated').textContent = now.toLocaleDateString('en-US', options);
}

// Navigation functions
function logout() {
    // Clear stored data
    localStorage.removeItem('finvoPortfolioData');
    localStorage.removeItem('finvoCalculatedPortfolio');
    
    // Redirect to home page
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

// Refresh dashboard data
function refreshDashboard() {
    loadData();
    updateDashboard();
    updateLastUpdated();
    
    // Refresh charts if they exist
    if (growthChart) {
        growthChart.destroy();
        initializeGrowthChart();
    }
    if (allocationChart) {
        allocationChart.destroy();
        initializeAllocationChart();
    }
}

// Export functions for global access
window.logout = logout;
window.refreshDashboard = refreshDashboard;

// Auto-refresh every 5 minutes
setInterval(refreshDashboard, 5 * 60 * 1000);





