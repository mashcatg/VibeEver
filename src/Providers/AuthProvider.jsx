import { createContext, useContext, useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axios = useAxios();

  const TOKEN_EXPIRY = 6 * 24 * 60 * 60 * 1000; 

  const createUser = async (fullName, email, password) => {
    try {
      const response = await axios.post('/auth/register', { fullName, email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, user } = response.data;

      // Save login time
      const loginTime = Date.now();
      localStorage.setItem('auth', JSON.stringify({ token, user, loginTime }));

      setUser(user);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during sign in' };
    }
  };

  const logOut = () => {
    localStorage.removeItem('auth');
    setUser(null);
  };

  const checkAuth = () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      try {
        const parsed = JSON.parse(auth);

        
        if (parsed.loginTime && Date.now() - parsed.loginTime > TOKEN_EXPIRY) {
          
          logOut();
          return;
        }

        if (parsed.token && parsed.user) {
          setUser(parsed.user);
        } else {
          logOut();
        }
      } catch (error) {
        logOut();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const googleSignIn = () => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect") || "/";
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?redirect=${encodeURIComponent(redirect)}`;
  };

  const handleGoogleCallback = async (token) => {
    try {
      const decodedToken = decodeURIComponent(token);
      const payload = JSON.parse(atob(decodedToken.split('.')[1]));

      // Store auth data with login time
      const loginTime = Date.now();
      const authData = { token: decodedToken, user: payload, loginTime };

      localStorage.setItem('auth', JSON.stringify(authData));
      setUser(payload);

      return authData;
    } catch (error) {
      logOut();
      throw new Error('Failed to process Google authentication');
    }
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    googleSignIn,
    handleGoogleCallback,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
};
