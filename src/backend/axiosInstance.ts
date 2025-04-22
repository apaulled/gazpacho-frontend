import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import * as Store from './storage';
import { TokenResponse, refreshToken } from "./loginApi";

const getEndpoints = () => {
    return {
        backendEndpoint: process.env.REACT_APP_BACKEND_ENDPOINT || 'http://localhost:8080/',
        frontendEndpoint: process.env.REACT_APP_FRONTEND_ENDPOINT || 'http://localhost:3000/'
    };
};

// Access the endpoints
const { backendEndpoint, frontendEndpoint } = getEndpoints();

// Extend AxiosRequestConfig to include custom retry flag
declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

const api = axios.create({
    baseURL: backendEndpoint,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const token: TokenResponse | null = await Store.getTokenData();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response: AxiosResponse) => response, async (error) => {
    const originalRequest: InternalAxiosRequestConfig = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const token = await Store.getTokenData();
            if (token) {
                const accessToken = await refreshToken(token.refreshToken);
                if (accessToken) {
                    await Store.storeTokenData(accessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken.accessToken}`;
                    return api(originalRequest);
                }
            }
        } catch {
            return Promise.reject(new Error("Error fetching RefreshToken"));
        }
    }
    return Promise.reject(error);
});

export {backendEndpoint, frontendEndpoint};
export default api;