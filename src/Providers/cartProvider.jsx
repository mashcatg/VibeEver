import { createContext, useContext, useState, useEffect } from 'react';
import useAxios from '../Hooks/useAxios';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post('/cart/add', { productId, quantity });
      setCart(response.data);
      toast.success('Added to cart successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`/cart/remove/${productId}`);
      setCart(response.data);
      toast.success('Removed from cart');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put('/cart/update-quantity', { productId, quantity });
      setCart(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  const applyCoupon = async (code) => {
    try {
      const response = await axios.post('/cart/apply-coupon', { code });
      setCart(response.data);
      toast.success('Coupon applied successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply coupon');
    }
  };

  return (
    <CartContext.Provider 
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};