import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from '../../lib/utils';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { verifyOtpAPI, forgotPasswordAPI } from '../../services/allApis';

export const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const resetEmail = sessionStorage.getItem('resetEmail');

  useEffect(() => {
    if (!resetEmail) {
      navigate('/forgot-password');
    }
  }, [navigate, resetEmail]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = async () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '']); // Clear OTP inputs

    // Read businessUID for the resend call
    const BUSINESS_UID = import.meta.env.VITE_BUSINESS_UID || "";
    const authData = JSON.parse(sessionStorage.getItem('authToken') || '{}');
    const businessUID = sessionStorage.getItem('businessUID') || authData?.businessUID || BUSINESS_UID;

    try {
      const response = await forgotPasswordAPI({ EmailID: resetEmail, businessUID });

      if (response && response.responseResult?.responseCode === "000") {
        // Update sessionStorage with new OTP result
        sessionStorage.setItem('forgotPasswordResult', JSON.stringify(response));
        if (response.Data?.userUID) {
          sessionStorage.setItem('userUID', response.Data.userUID);
        }
        Toast.fire({ icon: 'success', title: `New OTP sent to ${resetEmail}` });
      } else {
        Toast.fire({ icon: 'error', title: 'Failed to resend OTP. Please try again.' });
      }
    } catch (err) {
      console.error("Resend OTP Error:", err);
      Toast.fire({
        icon: 'error',
        title: 'Server error. Please check your connection.',
      });
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) {
      Toast.fire({ icon: 'error', title: 'Please enter all 4 digits of the OTP.' });
      return;
    }

    const enteredOtp = otp.join('');
    setIsLoading(true);

    try {
      // Server-side OTP verification — secure, no client-side comparison
      const response = await verifyOtpAPI({ EmailID: resetEmail, OTP: enteredOtp });

      if (response && response.responseResult?.responseCode === "000") {
        sessionStorage.setItem('tempOtp', enteredOtp);
        Toast.fire({ icon: 'success', title: 'OTP Verified Successfully!' }).then(() => {
          navigate('/reset-password');
        });
      } else {
        const errorMsg = response?.responseResult?.responseDescription || 'Invalid OTP. Please try again.';
        Toast.fire({ icon: 'error', title: errorMsg });
      }
    } catch (err) {
      console.error('OTP Verification Error:', err);
      Toast.fire({ icon: 'error', title: 'Server error. Please check your connection.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>

      <div className="text-center mb-8 flex flex-col items-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">Verify OTP</h2>
        <p className="text-[13px] text-gray-400 max-w-[300px]">Please enter OTP that send to <span className="text-gray-700 font-semibold">{resetEmail || "your email"}</span></p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-gray-500 text-center block mb-4">Enter OTP</label>
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
                className="w-[55px] h-[50px] text-center text-lg font-bold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all bg-white"
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-3 px-1">
            <span className="text-[11px] text-gray-400">
              {timer > 0 ? (
                <>Resend OTP in <span className="text-red-500 font-medium">{formatTime(timer)}</span></>
              ) : (
                <span className="text-green-600 font-medium">You can now resend OTP</span>
              )}
            </span>
            <button 
              type="button" 
              onClick={handleResend}
              disabled={!canResend}
              className={`text-[11px] font-bold underline underline-offset-2 transition-colors ${
                canResend 
                  ? "text-gray-900 hover:text-gray-700 decoration-gray-400" 
                  : "text-gray-300 cursor-not-allowed decoration-gray-200"
              }`}
            >
              Resend OTP
            </button>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-gray-900 text-white font-semibold py-2.5 px-10 rounded-lg hover:bg-gray-950 transition-colors text-sm disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Verifying...</span>
              </>
            ) : "Continue"}
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
