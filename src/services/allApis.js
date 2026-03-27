import { commonRequest } from "./axiosConfig";
import { BASE_URL } from "./baseUrl";

// ─── Auth APIs ─────────────────────────────────────────────────────────────────

// Login — POST /api/auth/login
// Payload: { EmailID, Password }
export const loginAPI = async (user) => {
    return await commonRequest("POST", `${BASE_URL}/api/auth/login`, user);
};

// Forgot Password Email Validation — POST /api/auth/forgot-password
// Payload: { EmailID, businessUID }
export const forgotPasswordAPI = async (data) => {
    return await commonRequest("POST", `${BASE_URL}/api/auth/forgot-password`, data);
};

// Verify OTP — POST /api/auth/verify-otp
// Payload: { EmailID, OTP }
export const verifyOtpAPI = async (data) => {
    return await commonRequest("POST", `${BASE_URL}/api/auth/verify-otp`, data);
};

// Reset Password / Update Password — POST /api/auth/reset-password
// Payload: { userUID, PassWord }
export const resetPasswordAPI = async (data) => {
    return await commonRequest("POST", `${BASE_URL}/api/auth/reset-password`, data);
};

// Logout — POST /api/auth/logout
// Sends the Bearer token from sessionStorage for server-side invalidation
export const logoutAPI = async () => {
    const token = sessionStorage.getItem("token");
    const headers = token
        ? { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
        : { "Content-Type": "application/json" };
    return await commonRequest("POST", `${BASE_URL}/api/auth/logout`, {}, headers);
};
