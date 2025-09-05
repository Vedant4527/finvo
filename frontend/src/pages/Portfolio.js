import React from 'react';

const Portfolio = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
        <p className="text-gray-600 mt-2">Manage and analyze your investment portfolio.</p>
      </div>

      <div className="card">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Portfolio Features Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Advanced portfolio management, rebalancing, and analysis tools are under development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Portfolio Analysis</h3>
              <p className="text-sm text-blue-700">Detailed performance metrics and risk analysis</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Rebalancing</h3>
              <p className="text-sm text-green-700">Automated portfolio rebalancing recommendations</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Tax Optimization</h3>
              <p className="text-sm text-purple-700">Tax-efficient investment strategies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;







