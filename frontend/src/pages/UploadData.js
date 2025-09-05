import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Target, TrendingUp, Shield, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const UploadData = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    monthlySalary: '',
    monthlySavings: '',
    financialGoal: '',
    goalAmount: '',
    goalTimeframe: '5',
    numberOfInvestments: '3',
    riskTolerance: 'medium'
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.monthlySalary || !form.monthlySavings || !form.financialGoal) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseFloat(form.monthlySavings) > parseFloat(form.monthlySalary)) {
      toast.error('Monthly savings cannot exceed monthly salary');
      return;
    }

    localStorage.setItem('finvo_user_inputs', JSON.stringify(form));
    toast.success('Financial data submitted successfully!');
    navigate('/portfolio-results');
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Financial Information</h1>
        <p className="text-gray-600 mt-2">Please provide your financial details to generate personalized portfolio recommendations.</p>
      </div>

      <form onSubmit={onSubmit} className="card max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Income & Savings Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
              Income & Savings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Salary / Income (₹) *
                </label>
                <input 
                  type="number" 
                  name="monthlySalary" 
                  value={form.monthlySalary} 
                  onChange={onChange} 
                  required 
                  min="0"
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Savings (₹) *
                </label>
                <input 
                  type="number" 
                  name="monthlySavings" 
                  value={form.monthlySavings} 
                  onChange={onChange} 
                  required 
                  min="0"
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 15000"
                />
              </div>
            </div>
          </div>

          {/* Financial Goals Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-green-600" />
              Financial Goals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Financial Goal Description *
                </label>
                <input 
                  type="text" 
                  name="financialGoal" 
                  value={form.financialGoal} 
                  onChange={onChange} 
                  required 
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Retirement corpus, House down payment, Child education"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Amount (₹)
                </label>
                <input 
                  type="number" 
                  name="goalAmount" 
                  value={form.goalAmount} 
                  onChange={onChange} 
                  min="0"
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 5000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeframe (Years)
                </label>
                <select 
                  name="goalTimeframe" 
                  value={form.goalTimeframe} 
                  onChange={onChange}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="1">1 Year</option>
                  <option value="3">3 Years</option>
                  <option value="5">5 Years</option>
                  <option value="10">10 Years</option>
                  <option value="15">15 Years</option>
                  <option value="20">20 Years</option>
                  <option value="25">25 Years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Investment Preferences Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
              Investment Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Investment Options
                </label>
                <select 
                  name="numberOfInvestments" 
                  value={form.numberOfInvestments} 
                  onChange={onChange}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="2">2 Options</option>
                  <option value="3">3 Options</option>
                  <option value="4">4 Options</option>
                  <option value="5">5 Options</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Tolerance *
                </label>
                <select 
                  name="riskTolerance" 
                  value={form.riskTolerance} 
                  onChange={onChange}
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="low">Low Risk (Conservative)</option>
                  <option value="medium">Medium Risk (Balanced)</option>
                  <option value="high">High Risk (Aggressive)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Risk Information */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Risk Level Information
            </h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Low Risk:</strong> Conservative approach with focus on capital preservation</p>
              <p><strong>Medium Risk:</strong> Balanced approach with moderate growth potential</p>
              <p><strong>High Risk:</strong> Aggressive approach with higher growth potential but more volatility</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button 
              type="submit" 
              className="btn-primary px-8 py-3 text-lg"
            >
              Generate Portfolio Recommendations
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadData;



