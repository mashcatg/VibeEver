import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import useAxios from '../../Hooks/useAxios';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const payment_id = searchParams.get('payment_id');
  const axios = useAxios();
  const paymentProcessed = useRef(false);

  useEffect(() => {
    let timer;

    const processPayment = async () => {
      if (!payment_id || paymentProcessed.current) return;

      try {
        paymentProcessed.current = true;
        await axios.post('/orders/process-payment', {payment_id });
        
        timer = setTimeout(() => {
          navigate('/dashboard');
        }, 5000);
      } catch (error) {
        console.error('Payment processing error:', error);
        paymentProcessed.current = false;
      }
    };

    processPayment();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [payment_id, navigate, axios]);

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