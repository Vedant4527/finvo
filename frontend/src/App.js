import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Simulation from './pages/Simulation';
import AIAdvisor from './pages/AIAdvisor';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import UploadData from './pages/UploadData';
import PortfolioResults from './pages/PortfolioResults';

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('finvo_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Routes>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
          </div>
        </Router>
        <Toaster position="top-right" />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen}
              setIsAuthenticated={setIsAuthenticated}
            />
            
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
              <div className="container mx-auto px-6 py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio-results" element={<PortfolioResults />} />
                  <Route path="/upload" element={<UploadData />} />
                  <Route path="/simulation" element={<Simulation />} />
                  <Route path="/ai-advisor" element={<AIAdvisor />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;




