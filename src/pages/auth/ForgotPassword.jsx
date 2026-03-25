import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';

export function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <AuthLayout>

      <div className="text-center mb-8">
        <h2 className="text-[22px] font-bold text-slate-900 mb-2">Forgot Password</h2>
        <p className="text-xs text-slate-400">Enter your email and we'll send you OTP to reset your password.</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/verify-otp'); }}>
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-slate-600">Email</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all font-sans"
          />
        </div>

        <div className="pt-2">
          <button type="submit" className="w-full bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-950 transition-colors text-sm shadow-md">
            Submit
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
