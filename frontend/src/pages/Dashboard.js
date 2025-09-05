import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Target, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Calendar
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  PieChart as RPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const Dashboard = () => {
  const [userData, setUserData] = React.useState(null);
  const [portfolioData, setPortfolioData] = React.useState(null);

  React.useEffect(() => {
    // Get user data from localStorage
    const userEmail = localStorage.getItem('user_email');
    const userInputs = JSON.parse(localStorage.getItem('finvo_user_inputs') || '{}');
    
    if (userEmail) {
      setUserData({ email: userEmail });
    }
    
    if (userInputs.monthlySalary) {
      // Calculate portfolio data similar to PortfolioResults
      const monthlySavings = parseFloat(userInputs.monthlySavings) || 0;
      const totalInvestable = monthlySavings * 12;
      const expectedReturn = 8;
      const currentValue = totalInvestable * (1 + expectedReturn/100); // Simulated current value
      
      setPortfolioData({
        totalValue: currentValue,
        totalReturn: expectedReturn,
        monthlyReturn: expectedReturn / 12,
        monthlySavings,
        totalInvestable,
        riskLevel: userInputs.riskTolerance || 'medium',
        goalAmount: parseFloat(userInputs.goalAmount) || 0,
        goalTimeframe: parseInt(userInputs.goalTimeframe) || 5,
        financialGoal: userInputs.financialGoal || 'Financial Goal'
      });
    }
  }, []);

  // Default data if no portfolio data
  const defaultPortfolioData = {
    totalValue: 105000,
    totalReturn: 5.2,
    monthlyReturn: 0.4,
    allocation: {
      equity: 50,
      debt: 40,
      gold: 5,
      cash: 5
    },
    goals: [
      { name: 'Retirement', target: 5000000, current: 105000, progress: 2.1 },
      { name: 'House Down Payment', target: 2000000, current: 105000, progress: 5.25 }
    ],
    recentTransactions: [
      { type: 'buy', asset: 'Nifty 50 Index Fund', amount: 5000, date: '2024-01-15' },
      { type: 'sell', asset: 'Gold ETF', amount: 2000, date: '2024-01-10' },
      { type: 'buy', asset: 'Liquid Fund', amount: 3000, date: '2024-01-05' }
    ]
  };

  const data = portfolioData || defaultPortfolioData;

  const pieData = portfolioData ? [
    { name: 'Equity / Stocks', value: 35 },
    { name: 'Mutual Funds / SIP', value: 30 },
    { name: 'Gold', value: 10 },
    { name: 'Government Bonds', value: 20 },
    { name: 'High Liquidity', value: 5 }
  ] : [
    { name: 'Equity', value: data.allocation.equity },
    { name: 'Debt', value: data.allocation.debt },
    { name: 'Gold', value: data.allocation.gold },
    { name: 'Cash', value: data.allocation.cash }
  ];

  const pieColors = ['#3b82f6','#10b981','#f59e0b','#22c55e','#64748b'];

  const growthData = [
    { month: 'Jan', value: portfolioData ? data.totalInvestable * 0.8 : 98000 },
    { month: 'Feb', value: portfolioData ? data.totalInvestable * 0.85 : 99000 },
    { month: 'Mar', value: portfolioData ? data.totalInvestable * 0.9 : 100500 },
    { month: 'Apr', value: portfolioData ? data.totalInvestable * 0.95 : 101200 },
    { month: 'May', value: portfolioData ? data.totalInvestable * 0.98 : 103000 },
    { month: 'Jun', value: portfolioData ? data.totalValue : 105000 }
  ];

  const goalProgress = portfolioData && portfolioData.goalAmount > 0 
    ? Math.min((portfolioData.totalValue / portfolioData.goalAmount) * 100, 100)
    : 0;

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {typeof value === 'number' ? `₹${value.toLocaleString()}` : value}
          </p>
          {change !== undefined && (
            <div className="flex items-center mt-1">
              {change >= 0 ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">this month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const AllocationCard = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Allocation</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RPieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
              {pieData.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
            </Pie>
            <Legend />
            <ChartTooltip />
          </RPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const GoalsCard = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Goals</h3>
      {portfolioData && portfolioData.goalAmount > 0 ? (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{portfolioData.financialGoal}</span>
              <span className="text-sm text-gray-600">
                ₹{portfolioData.totalValue.toLocaleString()} / ₹{portfolioData.goalAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(goalProgress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{goalProgress.toFixed(1)}% complete</p>
            <p className="text-xs text-gray-500 mt-1">
              Target: {portfolioData.goalTimeframe} years | Expected: ₹{Math.round(portfolioData.totalInvestable * Math.pow(1.08, portfolioData.goalTimeframe)).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {data.goals.map((goal) => (
            <div key={goal.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{goal.name}</span>
                <span className="text-sm text-gray-600">
                  ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{goal.progress.toFixed(1)}% complete</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const RecentTransactions = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {data.recentTransactions.map((txn, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${
                txn.type === 'buy' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <div>
                <p className="font-medium">{txn.asset}</p>
                <p className="text-sm text-gray-500">{txn.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${txn.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                {txn.type === 'buy' ? '+' : '-'}₹{txn.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 capitalize">{txn.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const GrowthChart = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Growth</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back{userData ? `, ${userData.email}` : ''}! Here's your portfolio overview.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Logo placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Portfolio Value"
          value={data.totalValue}
          change={data.totalReturn}
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Total Return"
          value={data.totalValue * (data.totalReturn / 100)}
          change={data.totalReturn}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Monthly Investment"
          value={portfolioData ? portfolioData.monthlySavings : data.totalValue * (data.monthlyReturn / 100)}
          change={portfolioData ? undefined : data.monthlyReturn}
          icon={Calendar}
          color="purple"
        />
        <StatCard
          title="Risk Level"
          value={portfolioData ? portfolioData.riskLevel.charAt(0).toUpperCase() + portfolioData.riskLevel.slice(1) : "Medium"}
          change={undefined}
          icon={AlertCircle}
          color="yellow"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AllocationCard />
          <GrowthChart />
          <RecentTransactions />
        </div>
        <div>
          <GoalsCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




