import React from 'react';

const Simulation = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Simulation</h1>
        <p className="text-gray-600 mt-2">Test different scenarios and see their impact on your portfolio.</p>
      </div>

      <div className="card">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Simulation Engine Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Advanced portfolio simulation with scenario testing and Monte Carlo analysis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">Scenario Testing</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Market crash simulations</li>
                <li>• Salary change impact</li>
                <li>• Goal modification effects</li>
                <li>• Risk tolerance adjustments</li>
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-3">Monte Carlo Analysis</h3>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• Probability distributions</li>
                <li>• Risk-return scenarios</li>
                <li>• Confidence intervals</li>
                <li>• Worst-case projections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;







