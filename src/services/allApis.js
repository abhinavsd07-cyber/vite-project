import { commonRequest } from "./axiosConfig";
import { BASE_URL } from "./baseUrl";

// Login API Call
export const loginAPI = async (user) => {
    // user payload format: { EmailID: "superadmin@gmail.com", Password: "Admin@123" }
    return await commonRequest("POST", `${BASE_URL}/Authentication/token`, user);
}

// Forgot Password API Call
export const forgotPasswordAPI = async (email) => {
    // TODO: Verify endpoint with senior
    // payload format: { EmailID: email }
    return await commonRequest("POST", `${BASE_URL}/Authentication/forgot-password`, { EmailID: email });
}

// Verify OTP API Call
export const verifyOtpAPI = async (data) => {
    // TODO: Verify endpoint with senior
    // data format: { EmailID: email, OTP: otp }
    return await commonRequest("POST", `${BASE_URL}/Authentication/verify-otp`, data);
}

// Reset Password API Call
export const resetPasswordAPI = async (data) => {
    // TODO: Verify endpoint with senior
    // data format: { EmailID: email, Password: password }
    return await commonRequest("POST", `${BASE_URL}/Authentication/reset-password`, data);
}
