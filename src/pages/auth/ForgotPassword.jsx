import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from '../../lib/utils';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { forgotPasswordAPI } from '../../services/allApis';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Toast.fire({
        icon: 'error',
        title: 'Please enter your email address!',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await forgotPasswordAPI(email);
      setIsLoading(false);
      
      console.log("Forgot Password API Response:", response);

      if (response && response.statusCode === "SB000") {
        sessionStorage.setItem('resetEmail', email);

        Toast.fire({
          icon: 'success',
          title: response.message || 'OTP has been sent to your email address.',
        }).then(() => {
          navigate('/verify-otp');
        });
      } else {
        console.error("Forgot Password Failed:", response);
        const errorMsg = response?.responseResult?.responseDescription || response?.message || 'No account found with that email address';
        Toast.fire({
          icon: 'error',
          title: errorMsg,
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Unexpected Error:", err);
      Toast.fire({
        icon: 'error',
        title: 'Server error. Please check your connection.',
      });
    }
  };

  return (
    <AuthLayout>

      <div className="text-center mb-8">
        <h2 className="text-[22px] font-bold text-slate-900 mb-2">Forgot Password</h2>
        <p className="text-xs text-slate-400 px-4">Enter your email and we'll send you an OTP to reset your password.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-slate-600 px-1">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. user@example.com"
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all font-sans shadow-sm"
          />
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
                <span>Sending OTP...</span>
              </>
            ) : "Submit"}
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
