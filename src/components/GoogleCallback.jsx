import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../Providers/AuthProvider';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleGoogleCallback } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const processAuth = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('message');

      if (error) {
        setError(error);
        setTimeout(() => navigate('/sign-in'), 2000);
        return;
      }

      if (token) {
        try {
          await handleGoogleCallback(token);
          navigate('/');
        } catch (err) {
          setError(err.message);
          setTimeout(() => navigate('/sign-in'), 2000);
        }
      }
    };

    processAuth();
  }, []); // Run only once on mount

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;