import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../../lib/utils";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { loginAPI } from "../../services/allApis";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Toast.fire({
        icon: "warning",
        title: "Please fill in all fields",
      });
      return;
    }

    setIsLoading(true);

    const payload = { EmailID: email, Password: password };

    try {
      const response = await loginAPI(payload);
      setIsLoading(false);

      // Success check: statusCode is "SB000"
      if (response && response.statusCode === "SB000") {
        const token = response.data?.accessToken;
        
        if (token) {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("authToken", JSON.stringify(response.data));
          
          // Store businessUID separately for use in Forgot Password flow
          if (response.data?.businessUID) {
            sessionStorage.setItem("businessUID", response.data.businessUID);
          } else if (response.data?.BusinessUID) {
            sessionStorage.setItem("businessUID", response.data.BusinessUID);
          }

          // Store refresh token and expiry times
          if (response.data?.refreshToken) {
            sessionStorage.setItem("refreshToken", response.data.refreshToken);
          }
          if (response.data?.accessTokenExpirationTime) {
            sessionStorage.setItem("accessTokenExpiry", response.data.accessTokenExpirationTime);
          }
          if (response.data?.refreshTokenExpirationTime) {
            sessionStorage.setItem("refreshTokenExpiry", response.data.refreshTokenExpirationTime);
          }

          // Store user display info from userInfo array
          const userInfo = response.data?.userInfo?.[0];
          if (userInfo?.userName) {
            sessionStorage.setItem("userName", userInfo.userName);
          }
          if (userInfo?.userEmail) {
            sessionStorage.setItem("userEmail", userInfo.userEmail);
          }
        }

        Toast.fire({
          icon: "success",
          title: "Login Successful",
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        // Error handling: Use responseDescription from responseResult
        Toast.fire({
          icon: "error",
          title: "Login Failed",
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Login Error:", err);
      Toast.fire({
        icon: "error",
        title: "Server Error. Please try again later.",
      });
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">
          Welcome back!
        </h2>
        <p className="text-[13px] text-gray-400">
          Log in to continue manage your account
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="text-[13px] font-medium text-gray-500">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all font-sans bg-white"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="login-password" className="text-[13px] font-medium text-gray-500">
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all font-sans bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-slate-900 text-white font-semibold py-2.5 px-10 rounded-lg hover:bg-slate-950 transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              "Log In"
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center space-y-3">
        <Link
          to="/forgot-password"
          className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors block"
        >
          Forgot your password?
        </Link>
        <p className="text-[12px] text-gray-400">
          Need help?{" "}
          <a href="#" className="text-gray-800 font-bold hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
