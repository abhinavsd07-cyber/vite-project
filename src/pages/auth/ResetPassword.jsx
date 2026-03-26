import { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Toast, updatePassword } from '../../lib/utils';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { useEffect } from 'react';

export function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const resetEmail = sessionStorage.getItem('resetEmail');

  useEffect(() => {
    if (!resetEmail) {
      navigate('/forgot-password');
    }
  }, [navigate, resetEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: 'Please fill in both password fields.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.fire({
        icon: 'error',
        title: 'Passwords do not match! Please try again.',
      });
      return;
    }

    // Password strength policy (8+ chars, uppercase, lowercase, number, symbol)
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
    if (!strongRegex.test(password)) {
      Toast.fire({
        icon: 'warning',
        title: 'Weak Password',
        text: 'Password must be 8+ chars and contain uppercase, lowercase, number, and symbol.',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      const updated = updatePassword(resetEmail, password);
      
      if (updated) {
        sessionStorage.removeItem('resetEmail');
        sessionStorage.removeItem('resetOtp');
        
        Toast.fire({
          icon: 'success',
          title: 'Your password has been reset successfully.',
        }).then(() => {
          navigate('/'); // Redirect to login on successful password change
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Failed to update password. User not found.',
        });
      }
    }, 1500);
  };

  return (
    <AuthLayout>

      <div className="text-center mb-8">
        <h2 className="text-[22px] font-bold text-slate-900 mb-2">Confirm Password</h2>
        <p className="text-xs text-slate-400">Enter your new password below</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-slate-600 flex items-center gap-1 px-1">
            New Password
          </label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all font-sans shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-slate-600 px-1">
            Confirm Password
          </label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all font-sans shadow-sm"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-950 transition-all text-sm shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Updating...</span>
              </>
            ) : "Update Password"}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center space-y-4">
        <Link to="/" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
          Back to login
        </Link>
        <p className="text-xs text-slate-400">
          Need help? <a href="#" className="text-slate-700 font-semibold hover:underline">Contact Support</a>
        </p>
      </div>
    </AuthLayout>
  );
}
