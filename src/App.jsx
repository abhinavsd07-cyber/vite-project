import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/auth/Login';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { VerifyOTP } from './pages/auth/VerifyOTP';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Logo } from './components/auth/Logo';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2.2 seconds to allow the final zoom out to finish
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="h-screen w-screen bg-white flex items-center justify-center overflow-hidden">
        <div className="animate-zoom-in">
          <div className="scale-[1.75] origin-center">
            <Logo />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Authentication Flow */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* ERP Dashboard Layout */}
        <Route 
          path="/dashboard" 
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
