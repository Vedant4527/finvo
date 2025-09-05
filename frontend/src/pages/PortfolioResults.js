import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ArrowLeft, Download, Share2, Target, TrendingUp, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#22c55e', '#06b6d4', '#64748b'];

function computeAllocation(inputs) {
  const { riskTolerance, numberOfInvestments, monthlySavings, goalAmount, goalTimeframe } = inputs;
  
  // Base allocation by risk tolerance
  let baseAllocation = {};
  
  if (riskTolerance === 'high') {
    baseAllocation = {
      'Equity / Stocks': 45,
      'Mutual Funds / SIP': 30,
      'Gold': 10,
      'Government Bonds': 10,
      'High Liquidity Funds': 5
    };
  } else if (riskTolerance === 'low') {
    baseAllocation = {
      'Equity / Stocks': 20,
      'Mutual Funds / SIP': 25,
      'Gold': 15,
      'Government Bonds': 30,
      'High Liquidity Funds': 10
    };
  } else { // medium
    baseAllocation = {
      'Equity / Stocks': 35,
      'Mutual Funds / SIP': 30,
      'Gold': 10,
      'Government Bonds': 20,
      'High Liquidity Funds': 5
    };
  }

  // Adjust based on number of investments
  const numInvestments = parseInt(numberOfInvestments);
  if (numInvestments < 4) {
    // Remove some categories for fewer investments
    if (numInvestments === 2) {
      baseAllocation = {
        'Equity / Stocks': 60,
        'Mutual Funds / SIP': 40
      };
    } else if (numInvestments === 3) {
      baseAllocation = {
        'Equity / Stocks': 40,
        'Mutual Funds / SIP': 35,
        'Government Bonds': 25
      };
    }
  }

  // Calculate amounts based on monthly savings
  const monthlySavingsAmount = parseFloat(monthlySavings) || 0;
  const totalInvestable = monthlySavingsAmount * 12; // Annual investment capacity

  const allocation = {};
  Object.entries(baseAllocation).forEach(([category, percentage]) => {
    allocation[category] = {
      percentage,
      amount: Math.round(totalInvestable * (percentage / 100))
    };
  });

  return {
    allocation,
    totalInvestable,
    monthlySavings: monthlySavingsAmount,
    goalAmount: parseFloat(goalAmount) || 0,
    goalTimeframe: parseInt(goalTimeframe) || 5
  };
}

const PortfolioResults = () => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = React.useState(null);

  React.useEffect(() => {
    try {
      const inputs = JSON.parse(localStorage.getItem('finvo_user_inputs') || '{}');
      if (!inputs.monthlySalary) {
        toast.error('No financial data found. Please fill the form first.');
        navigate('/upload');
        return;
      }
      
      const data = computeAllocation(inputs);
      setPortfolioData(data);
    } catch (error) {
      toast.error('Error loading portfolio data');
      navigate('/upload');
    }
  }, [navigate]);

  if (!portfolioData) {
    return (
      <div className="animate-fade-in">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating your portfolio recommendations...</p>
        </div>
      </div>
    );
  }

  const pieData = Object.entries(portfolioData.allocation).map(([name, data]) => ({
    name,
    value: data.amount,
    percentage: data.percentage
  }));

  const barData = Object.entries(portfolioData.allocation).map(([name, data]) => ({
    name: name.split(' ')[0], // Short name for bar chart
    amount: data.amount,
    percentage: data.percentage
  }));

  const goalProgress = portfolioData.goalAmount > 0 
    ? Math.min((portfolioData.totalInvestable / portfolioData.goalAmount) * 100, 100)
    : 0;

  const expectedReturn = 8; // 8% annual return assumption
  const projectedValue = portfolioData.totalInvestable * Math.pow(1 + expectedReturn/100, portfolioData.goalTimeframe);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Recommendations</h1>
            <p className="text-gray-600 mt-2">Your personalized investment allocation based on your financial profile.</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => navigate('/upload')}
              className="btn-secondary flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </button>
            <button className="btn-primary flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Investable Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{portfolioData.totalInvestable.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Investment</p>
              <p className="text-2xl font-bold text-gray-900">₹{portfolioData.monthlySavings.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expected Return</p>
              <p className="text-2xl font-bold text-gray-900">{expectedReturn}%</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projected Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{Math.round(projectedValue).toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Allocation</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  dataKey="value" 
                  nameKey="name" 
                  innerRadius={60} 
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`₹${Number(value).toLocaleString()}`, name]}
                  labelFormatter={(label) => `${label} (${pieData.find(d => d.name === label)?.percentage}%)`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Allocation Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(portfolioData.allocation).map(([category, data], index) => (
              <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <p className="font-medium text-sm">{category}</p>
                    <p className="text-xs text-gray-500">{data.percentage}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">₹{data.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goal Progress */}
      {portfolioData.goalAmount > 0 && (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Progress</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Target: ₹{portfolioData.goalAmount.toLocaleString()}</span>
              <span className="text-sm text-gray-600">{goalProgress.toFixed(1)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              At current investment rate, you'll reach {goalProgress.toFixed(1)}% of your goal in {portfolioData.goalTimeframe} years.
            </p>
          </div>
        </div>
      )}

      {/* Investment Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recommended Actions</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Start with the high liquidity allocation for emergency funds
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Set up SIP for mutual funds to benefit from rupee cost averaging
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Consider gold ETFs for portfolio diversification
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Review and rebalance portfolio every 6 months
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Risk Management</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Maintain 6 months of expenses in high liquidity funds
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Diversify across different sectors and market caps
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Consider tax-efficient investment options
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Monitor market conditions and adjust allocation as needed
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioResults;



