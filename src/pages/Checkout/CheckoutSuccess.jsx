import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import useAxios from '../../Hooks/useAxios';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
const axios =useAxios()
  useEffect(() => {
    if (sessionId) {
      console.log('Session ID:', sessionId);

      const payment = axios.post('/orders/process-payment' , {sessionId})
      console.log(payment);
      
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Payment Successful!</h1>
        <p className="text-text-body mb-8">Thank you for your purchase.</p>
        <p className="text-sm text-gray-500">Redirecting to your orders...</p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;