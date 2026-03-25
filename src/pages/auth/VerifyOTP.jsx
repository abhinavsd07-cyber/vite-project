import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';

export function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  return (
    <AuthLayout>


      <div className="text-center mb-8 flex flex-col items-center">
        <h2 className="text-[22px] font-bold text-slate-900 mb-2">Verify OTP</h2>
        <p className="text-xs text-slate-400 max-w-[280px]">Please enter OTP that sent to <span className="text-slate-600 font-medium">arunkumar123@gmail.com</span></p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-slate-600 text-center block mb-4">Enter OTP</label>
          <div className="flex justify-center gap-3 md:gap-4">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={inputRefs[i]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-[50px] h-[55px] md:w-[55px] md:h-[60px] text-center text-xl font-bold border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all bg-white shadow-sm"
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-3 px-2">
            <span className="text-[10px] text-slate-400">Resend OTP in <span className="text-red-500 font-medium">00:56</span></span>
            <button type="button" className="text-[10px] text-slate-600 font-bold hover:text-slate-900 underline decoration-slate-300 underline-offset-2">Resend OTP</button>
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" className="w-full bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-950 transition-colors text-sm shadow-md">
            Continue
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
