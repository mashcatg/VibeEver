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
 


    const checkAuth = () => {


      const auth = localStorage.getItem('auth');


      if (auth) {


        try {


          const parsed = JSON.parse(auth);


          if (parsed.token && parsed.user) {


            setUser(parsed.user);


          } else {


            localStorage.removeItem('auth');


          }


        } catch (error) {


          localStorage.removeItem('auth');


        }


      }


      setLoading(false);


    };





    checkAuth();


  }, []); // Run only once on mount





  const googleSignIn = () => {


    // Open Google auth in a new window


    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;


  };





  // Add function to handle the callback


  const handleGoogleCallback = async (token) => {


    try {


      const decodedToken = decodeURIComponent(token);


      const payload = JSON.parse(atob(decodedToken.split('.')[1]));


      


      // Store auth data


      const authData = { token: decodedToken, user: payload };


      localStorage.setItem('auth', JSON.stringify(authData));


      setUser(payload);


      


      return authData;


    } catch (error) {


      localStorage.removeItem('auth');


      throw new Error('Failed to process Google authentication');

    }


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
    logOut,
    googleSignIn,
    handleGoogleCallback
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