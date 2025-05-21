import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../../../Hooks/useAxios';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const { token } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/auth/verify-email/${token}`);
        if (response.data.success) {
          setVerificationStatus('success');
        //   toast.success('Email verified successfully!');
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/sign-in');
          }, 3000);
        }
      } catch (error) {
        setVerificationStatus('error');
        toast.error(error.response?.data?.message || 'Verification failed');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          {verificationStatus === 'verifying' && (
            <>
              <h2 className="text-2xl font-bold text-gray-900">
                Verifying your email...
              </h2>
              <div className="mt-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              </div>
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <h2 className="text-2xl font-bold text-green-600">
                Email Verified Successfully!
              </h2>
              <p className="mt-2 text-gray-600">
                Redirecting to login page in a few seconds...
              </p>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <h2 className="text-2xl font-bold text-red-600">
                Verification Failed
              </h2>
              <p className="mt-2 text-gray-600">
                The verification link may be expired or invalid.
              </p>
              <button
                onClick={() => navigate('/sign-in')}
                className="mt-4 text-primary hover:underline"
              >
                Return to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;