import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCookie, setCookie, removeCookie } from '@/lib/cookies';

const ACCESS_TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const PERMISSIONS_KEY = 'auth_permissions';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  permissions: string[];
  accessToken: string | null;
    isInitialized: boolean;

  setAuth: (user: User, permissions: string[], token: string) => void;
  clearAuth: () => void;
}
const loadFromCookies = () => {
  try {
    const token = getCookie(ACCESS_TOKEN_KEY);
    const userJson = getCookie(USER_KEY);
    const permissionsJson = getCookie(PERMISSIONS_KEY);

    if (!token) {
      console.log('⚠️ No token found in cookies');
      return { accessToken: null, user: null, permissions: [] };
    }

    const user = userJson ? JSON.parse(userJson) : null;
    const permissions = permissionsJson ? JSON.parse(permissionsJson) : [];

    console.log('✅ Auth loaded from cookies:', { 
      hasToken: !!token, 
      hasUser: !!user,
      permissions: permissions.length 
    });

    return { accessToken: token, user, permissions };
  } catch (error) {
    console.error('❌ Error loading auth from cookies:', error);
    return { accessToken: null, user: null, permissions: [] };
  }
};

const initialState = loadFromCookies();

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initialize from cookies on creation
  user: initialState.user,
  permissions: initialState.permissions,
  accessToken: initialState.accessToken,
  isInitialized: true,

  setAuth: (user, permissions, token) => {
    console.log('🔐 Setting auth - Token:', token.substring(0, 20) + '...');

    // Save to cookies with 30 day expiration
    setCookie(ACCESS_TOKEN_KEY, token, 30);
    setCookie(USER_KEY, JSON.stringify(user), 30);
    setCookie(PERMISSIONS_KEY, JSON.stringify(permissions), 30);

    // Update Zustand state
    set({ 
      user, 
      permissions, 
      accessToken: token,
      isInitialized: true 
    });

    // Verify after short delay
    setTimeout(() => {
      const verified = getCookie(ACCESS_TOKEN_KEY);
      console.log(verified ? '✅ Token verified in cookies' : '❌ Token NOT in cookies');
    }, 100);
  },

  clearAuth: () => {
    console.log('🚪 Logging out - Clearing auth');
    
    // Remove from cookies
    removeCookie(ACCESS_TOKEN_KEY);
    removeCookie(USER_KEY);
    removeCookie(PERMISSIONS_KEY);

    // Clear state
    set({ 
      user: null, 
      permissions: [], 
      accessToken: null,
      isInitialized: true 
    });
  },
}));