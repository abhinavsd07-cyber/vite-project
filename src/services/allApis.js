import { commonRequest, authAxios } from "./axiosConfig";
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

// Refresh Token — POST /api/auth/refresh-token
// Payload: { refreshToken }
export const refreshTokenAPI = async (data) => {
    return await commonRequest("POST", `${BASE_URL}/api/auth/refresh-token`, data);
};

// ─── Generic Authenticated Request Helper ──────────────────────────────────────

const authRequest = async (method, url, data) => {
    try {
        const response = await authAxios({
            method,
            url,
            data,
        });
        return response.data;
    } catch (error) {
        return error.response?.data || error;
    }
};

// ─── Modular APIs (Proxy endpoints to backend) ──────────────────────────────

// CUSTOMERS
export const getCustomersAPI = () => authRequest("GET", `${BASE_URL}/api/customers`);
export const getCustomerByIdAPI = (id) => authRequest("GET", `${BASE_URL}/api/customers/${id}`);
export const createCustomerAPI = (data) => authRequest("POST", `${BASE_URL}/api/customers`, data);
export const updateCustomerAPI = (id, data) => authRequest("PUT", `${BASE_URL}/api/customers/${id}`, data);
export const deleteCustomerAPI = (id) => authRequest("DELETE", `${BASE_URL}/api/customers/${id}`);

// VENDORS
export const getVendorsAPI = () => authRequest("GET", `${BASE_URL}/api/vendors`);
export const getVendorByIdAPI = (id) => authRequest("GET", `${BASE_URL}/api/vendors/${id}`);
export const createVendorAPI = (data) => authRequest("POST", `${BASE_URL}/api/vendors`, data);
export const updateVendorAPI = (id, data) => authRequest("PUT", `${BASE_URL}/api/vendors/${id}`, data);
export const deleteVendorAPI = (id) => authRequest("DELETE", `${BASE_URL}/api/vendors/${id}`);

// USERS
export const getUsersAPI = () => authRequest("GET", `${BASE_URL}/api/users`);
export const getUserByIdAPI = (id) => authRequest("GET", `${BASE_URL}/api/users/${id}`);
export const createUserAPI = (data) => authRequest("POST", `${BASE_URL}/api/users`, data);
export const updateUserAPI = (id, data) => authRequest("PUT", `${BASE_URL}/api/users/${id}`, data);
export const deleteUserAPI = (id) => authRequest("DELETE", `${BASE_URL}/api/users/${id}`);

// SETTINGS (Domains, Categories, Countries, Years, Groups)
export const getSettingsDataAPI = (type) => authRequest("GET", `${BASE_URL}/api/settings/${type}`);
export const saveSettingsDataAPI = (type, data) => authRequest("POST", `${BASE_URL}/api/settings/${type}`, data);
export const deleteSettingsDataAPI = (type, id) => authRequest("DELETE", `${BASE_URL}/api/settings/${type}/${id}`);

// DOCS
export const getDocsAPI = () => authRequest("GET", `${BASE_URL}/api/docs`);
export const uploadDocAPI = (data) => authRequest("POST", `${BASE_URL}/api/docs/upload`, data);
export const deleteDocAPI = (id) => authRequest("DELETE", `${BASE_URL}/api/docs/${id}`);

// MEETINGS
export const getMeetingsAPI = () => authRequest("GET", `${BASE_URL}/api/meetings`);
export const createMeetingAPI = (data) => authRequest("POST", `${BASE_URL}/api/meetings`, data);
export const deleteMeetingAPI = (id) => authRequest("DELETE", `${BASE_URL}/api/meetings/${id}`);

// REQUESTS
export const getRequestsAPI = () => authRequest("GET", `${BASE_URL}/api/requests`);
export const createRequestAPI = (data) => authRequest("POST", `${BASE_URL}/api/requests`, data);
export const updateRequestStatusAPI = (id, data) => authRequest("PATCH", `${BASE_URL}/api/requests/${id}`, data);

// DASHBOARD
export const getDashboardMetricsAPI = () => authRequest("GET", `${BASE_URL}/api/dashboard/metrics`);
export const getDashboardChartsAPI = () => authRequest("GET", `${BASE_URL}/api/dashboard/charts`);
