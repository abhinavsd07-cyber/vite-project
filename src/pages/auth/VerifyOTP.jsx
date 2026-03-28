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
    const BUSINESS_UID = "3B8248F7-6655-EF11-97DD-00155D01229B";
    const authData = JSON.parse(sessionStorage.getItem('authToken') || '{}');
    const businessUID = sessionStorage.getItem('businessUID') || authData?.businessUID || BUSINESS_UID;

    try {
      const response = await forgotPasswordAPI({ EmailID: resetEmail, businessUID });
      console.log("Resend OTP Response:", response);
      console.log("OTP:", response.Data?.userPasswordOTP);

      if (response && response.responseResult?.responseCode === "000") {
        // Update sessionStorage with new OTP result
        sessionStorage.setItem('forgotPasswordResult', JSON.stringify(response));
        if (response.Data?.userUID) {
          sessionStorage.setItem('userUID', response.Data.userUID);
        }
        Toast.fire({
          icon: 'success',
          title: `New OTP sent to ${resetEmail}`,
        });
      } else {
        console.error("Resend OTP Failed:", response);
        Toast.fire({
          icon: 'error',
          title: 'Failed to resend OTP. Please try again.',
        });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) {
      Toast.fire({
        icon: 'error',
        title: 'Please enter all 4 digits of the OTP.',
      });
      return;
    }

    const enteredOtp = otp.join('');

    // Get the OTP from the Forgot Password API response stored in sessionStorage
    const forgotResult = JSON.parse(sessionStorage.getItem('forgotPasswordResult') || '{}');
    const serverOtp = forgotResult?.Data?.userPasswordOTP;

    console.log("Entered OTP:", enteredOtp);
    console.log("Expected OTP from server:", serverOtp);

    if (!serverOtp) {
      Toast.fire({
        icon: 'error',
        title: 'Session expired. Please go back and try again.',
      });
      return;
    }

    if (enteredOtp === String(serverOtp)) {
      // OTP matches — store it and proceed to Reset Password
      sessionStorage.setItem('tempOtp', enteredOtp);

      Toast.fire({
        icon: 'success',
        title: 'OTP Verified Successfully!',
      }).then(() => {
        navigate('/reset-password');
      });
    } else {
      console.error("OTP mismatch! Entered:", enteredOtp, "Expected:", serverOtp);
      Toast.fire({
        icon: 'error',
        title: 'Invalid OTP. Please try again.',
      });
    }
  };

  return (
    <AuthLayout>

      <div className="text-center mb-8 flex flex-col items-center">
        <h2 className="text-[22px] font-bold text-slate-900 mb-2">Verify OTP</h2>
        <p className="text-xs text-slate-400 max-w-[280px]">Please enter OTP sent to <span className="text-slate-600 font-medium">{resetEmail || "your email"}</span></p>
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
            <span className="text-[10px] text-slate-400">
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
              className={`text-[10px] font-bold underline underline-offset-2 transition-colors ${
                canResend 
                  ? "text-slate-900 hover:text-slate-700 decoration-slate-400" 
                  : "text-slate-300 cursor-not-allowed decoration-slate-200"
              }`}
            >
              Resend OTP
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-950 transition-colors text-sm shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
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
