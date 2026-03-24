import http from '@/utils/https';
import cookie from 'js-cookie';

export const signup = async (data) => {
  try {
    const response = await http.post('/users/signup', data);
    const { token, user } = response.data.data;
    
    // Store auth data
    setCookie('authToken', token);
    setLocalStorage('user', user);
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const login = async (data) => {
  try {
    const response = await http.post('/users/login', data);
    const { token, user } = response.data.data;
    
    // Store auth data
    setCookie('authToken', token);
    setLocalStorage('user', user);
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    const response = await http.get('/users/logout');
    // Clear auth data
    removeCookie('authToken');
    removeLocalStorage('user');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Cookie management
export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1, // 1 day expiry
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }
};

export const removeCookie = (key) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }
};

export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
  return undefined;
};

// Local storage management
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Authentication helper
export const authenticate = (data, next) => {
  setCookie("authToken", data.token);
  setLocalStorage("user", data.user);
  next();
};

// Check if user is authenticated
export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("authToken");
    
    if (cookieChecked) {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }
    }
  }
  return false;
};

// Get current user
export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Check if user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'ADMIN';
};

// module.exports = {
//   signup,
//   login,
//   logout,
//   setCookie,
//   removeCookie,
//   getCookie,
//   setLocalStorage,
//   removeLocalStorage,
//   authenticate,
//   isAuth,
//   getCurrentUser,
//   isAdmin,
// };
