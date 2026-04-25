// import { useAuthStore } from '@/context/authContext';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// interface FetchOptions extends RequestInit {
//   params?: Record<string, any>;
// }

// export const apiClient = async (endpoint: string, options: FetchOptions = {}) => {
//   const { params, ...fetchOptions } = options;
//   const token = useAuthStore.getState().accessToken;

//   // Build URL with query params
//   let url = `${API_BASE_URL}${endpoint}`;
//   if (params) {
//     const searchParams = new URLSearchParams(params);
//     url += `?${searchParams.toString()}`;
//   }

//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...fetchOptions.headers,
//   };

//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   try {
//     const response = await fetch(url, {
//       ...fetchOptions,
//       headers,
//     });

//     if (!response.ok) {
//       if (response.status === 401) {
//         useAuthStore.getState().clearAuth();
//         window.location.href = '/login';
//       }
      
//       const error = await response.json().catch(() => ({}));
//       throw {
//         status: response.status,
//         message: error.message || 'Request failed',
//         data: error,
//       };
//     }

//     return response.json();
//   } catch (error) {
//     throw error;
//   }
  
// };
// src/utils/axios.ts
// import axios from 'axios'
// import { useAuthStore } from '@/context/authContext'

// export const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
  
// })

// // ✅ Automatically attach token
// apiClient.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().accessToken
//   if (token) {
//     config.headers = config.headers || {}
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// // ✅ Handle 401 globally
// apiClient.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status === 401) {
//       useAuthStore.getState().clearAuth()
//       window.location.href = '/login'
//     }
//     return Promise.reject(error)
//   }
// )
import axios from 'axios';
import { useAuthStore } from '@/context/authContext';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to requests
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);