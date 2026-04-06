import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from '../../lib/utils';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { forgotPasswordAPI } from '../../services/allApis';

export const ForgotPassword = () => {
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
    
    // Read businessUID from sessionStorage (stored during login)
    // Falls back to the VITE_BUSINESS_UID env variable
    const BUSINESS_UID = import.meta.env.VITE_BUSINESS_UID || "";
    const authData = JSON.parse(sessionStorage.getItem('authToken') || '{}');
    const businessUID = sessionStorage.getItem('businessUID')
                     || authData?.businessUID
                     || authData?.BusinessUID
                     || BUSINESS_UID;

    const payload = {
      EmailID: email,
      businessUID: businessUID
    };

    try {
      const response = await forgotPasswordAPI(payload);
      setIsLoading(false);

      if (response && response.responseResult?.responseCode === "000") {
        // Store email and userUID from response into sessionStorage
        sessionStorage.setItem('resetEmail', email);
        sessionStorage.setItem('forgotPasswordResult', JSON.stringify(response));
        // Note: API returns capital 'Data', not 'data'
        if (response.Data?.userUID) {
          sessionStorage.setItem('userUID', response.Data.userUID);
        }

        Toast.fire({
          icon: 'success',
          title: 'Email validated successfully!',
        }).then(() => {
          navigate('/verify-otp');
        });
      } else {
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
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">Forgot Password</h2>
        <p className="text-[13px] text-gray-400 px-2">Enter your email and we'll send you OTP to reset your password.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label htmlFor="forgot-email" className="text-[13px] font-medium text-gray-500">Email</label>
          <input 
            id="forgot-email"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all font-sans bg-white"
          />
        </div>

        <div className="pt-2 flex justify-center">
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-slate-900 text-white font-semibold py-2.5 px-10 rounded-lg hover:bg-slate-950 transition-all text-sm disabled:opacity-70 flex items-center justify-center gap-2"
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

      <div className="mt-6 text-center space-y-3">
        <Link to="/" className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors block">
          Back to login
        </Link>
        <p className="text-[12px] text-gray-400">
          Need help? <a href="#" className="text-gray-800 font-bold hover:underline">Contact Support</a>
        </p>
      </div>
    </AuthLayout>
  );
}
