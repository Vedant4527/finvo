import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('finvo_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('finvo_user_inputs');
    setIsAuthenticated(false);
  };

  const userEmail = localStorage.getItem('user_email');
  const userName = localStorage.getItem('user_name');

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-4 flex items-center space-x-3">
            {/* Logo placeholder */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-110">
              <span className="text-white font-bold text-sm">FE</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">FINVO EDGE</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md">
            <Bell className="h-6 w-6" />
          </button>
          
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md">
              <User className="h-6 w-6" />
              <span className="text-sm font-medium text-gray-700">
                {userName || userEmail || 'Demo User'}
              </span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




