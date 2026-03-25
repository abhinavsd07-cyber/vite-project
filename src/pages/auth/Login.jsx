import { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthLayout } from '../../components/auth/AuthLayout';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Show SweetAlert2 toast
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Login Successful',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).then(() => {
      navigate('/dashboard');
    });
  };

  return (
    <AuthLayout>

      <div className="text-center mb-8">
        <h2 className="text-[22px] font-bold text-slate-900 mb-2">Welcome Back!</h2>
        <p className="text-xs text-slate-400">Log in to continue managing your account</p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-slate-600">Email</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all font-sans"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-slate-600 flex items-center gap-1">
            Password <span className="w-3 h-3 border border-slate-300 rounded-full inline-flex items-center justify-center text-[8px] text-slate-400 cursor-help">i</span>
          </label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all font-sans"
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
          <button type="submit" className="w-full bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-950 transition-colors text-sm shadow-md">
            Login
          </button>
        </div>
      </form>

      <div className="mt-6 text-center space-y-4">
        <Link to="/forgot-password" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
          Forgot your password?
        </Link>
        <p className="text-xs text-slate-400">
          Need help? <a href="#" className="text-slate-700 font-semibold hover:underline">Contact Support</a>
        </p>
      </div>
    </AuthLayout>
  );
}
