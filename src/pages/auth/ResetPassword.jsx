import { useState, useEffect } from 'react';
import { EyeOff, Eye, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from '../../lib/utils';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { resetPasswordAPI } from '../../services/allApis';

export const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const resetEmail = sessionStorage.getItem('resetEmail');
  const userUID = sessionStorage.getItem('userUID');

  useEffect(() => {
    if (!resetEmail) {
      navigate('/forgot-password');
    }
  }, [navigate, resetEmail]);

  // Live validation for password mismatch
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrorMessage('Passwords do not match');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrorMessage('');
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setErrorMessage('Please fill in both password fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match! Please try again.');
      return;
    }

    // Password strength policy (8+ chars, uppercase, lowercase, number, symbol)
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
    if (!strongRegex.test(password)) {
      setErrorMessage('Password must be 8+ chars with uppercase, lowercase, number, and symbol.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    
    // Use the exact payload format: { userUID, PassWord }
    const payload = {
      userUID: userUID || "",
      PassWord: password
    };

    try {
      const response = await resetPasswordAPI(payload);
      setIsLoading(false);

      if (response && response.responseResult?.responseCode === "000") {
        sessionStorage.removeItem('resetEmail');
        sessionStorage.removeItem('userUID');
        sessionStorage.removeItem('forgotPasswordResult');
        sessionStorage.removeItem('tempOtp');
        
        Toast.fire({
          icon: 'success',
          title: response.responseResult?.responseDescription || 'Your password has been reset successfully.',
        }).then(() => {
          navigate('/'); // Redirect to login
        });
      } else {
        const errorMsg = response?.responseResult?.responseDescription || response?.message || 'Failed to update password. Please try again.';
        setErrorMessage(errorMsg);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Unexpected Error:", err);
      setErrorMessage('Server error. Please check your connection.');
    }
  };

  return (
    <AuthLayout>

      <div className="text-center mb-8">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">Confirm Password</h2>
        <p className="text-[13px] text-gray-400">Enter your new password.</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label htmlFor="new-password" className="text-[13px] font-medium text-gray-500 flex items-center gap-1">
            New Password{" "}
            <span className="w-3.5 h-3.5 border border-gray-300 rounded-full inline-flex items-center justify-center text-[8px] text-gray-400 cursor-help">
              i
            </span>
          </label>
          <div className="relative">
            <input 
              id="new-password"
              type={showNewPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all font-sans bg-white"
            />
            <button 
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="confirm-password" className="text-[13px] font-medium text-gray-500">
            Confirm Password
          </label>
          <div className="relative">
            <input 
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"} 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all font-sans bg-white"
            />
            <button 
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Error message display */}
        {errorMessage && (
          <div className="flex items-center gap-1.5 text-red-500 text-[12px]">
            <AlertCircle size={14} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="pt-1 flex justify-center">
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-gray-900 text-white font-semibold py-2.5 px-10 rounded-lg hover:bg-gray-950 transition-all text-sm disabled:opacity-70 flex items-center justify-center gap-2"
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

      <div className="mt-6 text-center space-y-3">
        <p className="text-[12px] text-gray-400">
          Need help? <a href="#" className="text-gray-800 font-bold hover:underline">Contact Support</a>
        </p>
      </div>
    </AuthLayout>
  );
}
