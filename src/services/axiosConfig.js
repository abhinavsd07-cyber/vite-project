import axios from 'axios';
import { BASE_URL } from './baseUrl';

// ─── Token helpers ────────────────────────────────────────────────────────────

// Check if a token expiry time string has already passed
const isExpired = (expiryTimeStr) => {
    if (!expiryTimeStr) return true;
    return new Date() >= new Date(expiryTimeStr);
};

// Clear all session data and redirect to login page
const forceLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
};

// ─── Axios instance with request interceptor (for authenticated calls) ────────

export const authAxios = axios.create();

authAxios.interceptors.request.use(async (config) => {
    const accessExpiry  = sessionStorage.getItem('accessTokenExpiry');
    const refreshExpiry = sessionStorage.getItem('refreshTokenExpiry');
    const refreshToken  = sessionStorage.getItem('refreshToken');

    if (isExpired(accessExpiry)) {
        // Access token expired — try refreshing
        if (isExpired(refreshExpiry) || !refreshToken) {
            // Refresh token also expired → force logout
            forceLogout();
            return Promise.reject(new Error('Session expired. Please log in again.'));
        }

        try {
            // Call backend refresh-token endpoint
            const res = await axios.post(
                `${BASE_URL}/api/auth/refresh-token`,
                { refreshToken },
                { headers: { 'Content-Type': 'application/json' } }
            );
            const newData = res.data?.data;

            if (newData?.accessToken) {
                // Save the new tokens and expiry times
                sessionStorage.setItem('token', newData.accessToken);
                sessionStorage.setItem('accessTokenExpiry', newData.accessTokenExpirationTime);
                if (newData.refreshToken) {
                    sessionStorage.setItem('refreshToken', newData.refreshToken);
                }
                if (newData.refreshTokenExpirationTime) {
                    sessionStorage.setItem('refreshTokenExpiry', newData.refreshTokenExpirationTime);
                }
                config.headers['Authorization'] = `Bearer ${newData.accessToken}`;
            } else {
                forceLogout();
                return Promise.reject(new Error('Token refresh failed.'));
            }
        } catch {
            forceLogout();
            return Promise.reject(new Error('Token refresh failed.'));
        }
    } else {
        // Access token still valid — attach it
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return config;
});

// ─── Simple request (no auth — used for login, forgot-password etc.) ─────────

export const commonRequest = async (method, url, body, header) => {
    const reqConfig = {
        method,
        url,
        data: body,
        headers: header ? header : { 'Content-Type': 'application/json' },
    };
    try {
        const response = await axios(reqConfig);
        return response.data;
    } catch (error) {
        return error.response || error;
    }
};

