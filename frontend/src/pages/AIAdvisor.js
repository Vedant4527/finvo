import React from 'react';

const AIAdvisor = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Financial Advisor</h1>
        <p className="text-gray-600 mt-2">Get personalized investment advice from our AI-powered financial advisor.</p>
      </div>

      <div className="card">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI Advisor Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Intelligent financial advice powered by advanced AI algorithms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-3">Portfolio Recommendations</h3>
              <p className="text-sm text-purple-700">AI-driven portfolio allocation based on your profile and goals</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-3">Chat Assistant</h3>
              <p className="text-sm text-indigo-700">Interactive chat for financial questions and guidance</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
              <h3 className="font-semibold text-pink-900 mb-3">Market Insights</h3>
              <p className="text-sm text-pink-700">Real-time market analysis and investment opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;







