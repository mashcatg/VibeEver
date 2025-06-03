import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from '../Hooks/useAxios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axios =useAxios()

  const createUser = async (fullName, email, password) => {
    try {
      const response = await axios.post('/auth/register', {
        fullName,
        email,
        password
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      localStorage.setItem('auth', JSON.stringify({ token, user }));
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

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      setUser(auth.user);
    }
    setLoading(false);
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut
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