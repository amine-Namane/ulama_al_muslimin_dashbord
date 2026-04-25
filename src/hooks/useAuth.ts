
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/context/authContext';
import { apiClient } from '@/utils/axios';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

interface LoginCredentials {
  email: string;
  password: string;
}

interface ForgotPasswordCredentials {
  email: string;
}

// interface ResetPasswordCredentials {
//   email: string;
//   code: string;
//   newPassword: string;
// }

interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  user: any;
}

interface ForgotPasswordResponse {
  status: boolean;
  message: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data as LoginResponse;
    },

    onSuccess: (response) => {
      const { user, token } = response;
      const permissions = user?.roles || [];

      if (!user || !token) {
        throw new Error('Invalid login response from server');
      }

      // Save to cookies and state
      setAuth(user, permissions, token);
      
      // Clear react-query cache
      queryClient.clear();
      
      toast.success('Login successful!');
      
      // Navigate after ensuring cookies are set
      setTimeout(() => {
        navigate({ to: '/' });
      }, 100);
    },

    onError: (error: any) => {
      console.error('❌ Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
};

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    clearAuth();
    queryClient.clear();
    toast.info('Logged out successfully');
    navigate({ to: '/sign-in' });
  };
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (credentials: ForgotPasswordCredentials) => {
      const response = await apiClient.post('/auth/forgot-password', credentials);
      return response.data as ForgotPasswordResponse;
    },

    onSuccess: (response) => {
      if (response.status) {
        toast.success(response.message || 'OTP sent successfully!');
      }
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (credentials: { email: string; code: string }) => {
      const response = await apiClient.post('/auth/verify-otp', credentials);
      return response.data as { status: boolean; message: string };
    },

    onSuccess: (response) => {
      if (response.status) {
        toast.success(response.message || 'OTP verified successfully!');
      }
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    },
  });
};

// export const useResetPassword = () => {
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: async (credentials: ResetPasswordCredentials) => {
//       const response = await apiClient.post('/auth/reset-password', credentials);
//       return response.data as { status: boolean; message: string };
//     },

//     onSuccess: (response) => {
//       if (response.status) {
//         toast.success(response.message || 'Password reset successful!');
//         navigate({ to: '/sign-in' });
//       }
//     },

//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || 'Password reset failed');
//     },
//   });
// };
