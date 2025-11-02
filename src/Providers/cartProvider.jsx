import { createContext, useContext, useState, useEffect, useCallback } from "react";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  const { user } = useAuth();

  // Helper function to get token
  const getToken = () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      try {
        return JSON.parse(auth)?.token;
      } catch {
        return null;
      }
    }
    return null;
  };

  const fetchCart = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("/cart", {
        headers: { Authorization: `${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  // Fetch cart when user logs in, clear when user logs out
  useEffect(() => {
    if (user) {
      // User is logged in, fetch cart
      fetchCart();
    } else {
      // User is logged out, clear cart
      setCart(null);
      setLoading(false);
    }
  }, [user, fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    const token = getToken();
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "/cart/add",
        { productId, quantity },
        { headers: { Authorization: `${token}` } }
      );
      setCart(response.data);
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    const token = getToken();
    if (!token) {
      toast.error("Please login to manage cart");
      return;
    }
    try {
      const response = await axios.delete(
        `/cart/remove/${productId}`,
        { headers: { Authorization: `${token}` } }
      );
      setCart(response.data);
      toast.success("Removed from cart");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const token = getToken();
    if (!token) {
      toast.error("Please login to manage cart");
      return;
    }
    try {
      const response = await axios.put(
        "/cart/update-quantity",
        { productId, quantity },
        { headers: { Authorization: `${token}` } }
      );
      setCart(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const applyCoupon = async (code) => {
    const token = getToken();
    if (!token) {
      toast.error("Please login to apply coupon");
      return;
    }
    try {
      const response = await axios.post(
        "/cart/apply-coupon",
        { code },
        { headers: { Authorization: `${token}` } }
      );
      setCart(response.data);
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  };

  const handleStripeCartPayment = async () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const token = getToken();
    if (!token) {
      toast.error("Please login to proceed with payment");
      return;
    }

    try {
      const response = await axios.post(
        "/orders/create-checkout-session",
        {},
        { headers: { Authorization: `${token}` } }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("No URL returned from Stripe API");
      }
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      alert("Failed to create payment session. Please try again.");
    }
  };

  const directStripePayment = async (productId) => {
    const token = getToken();
    if (!token) {
      toast.error("Please login to proceed with payment");
      return;
    }
    try {
      const response = await axios.post(
        "/orders/directStripe",
        { productId },
        { headers: { Authorization: `${token}` } }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("No URL returned from Stripe API");
      }
    } catch (error) {
      console.log(error);
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
        applyCoupon,
        handleStripeCartPayment,
        directStripePayment,
        fetchCart,
        getToken
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
