import { createContext, useContext, useState, useEffect } from "react";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  console.log(token);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [token]);

  const fetchCart = async () => {
    // setLoading(false);
    try {
      const response = await axios.get("/cart", {
        headers: { Authorization: `${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true)
    try {
      const response = await axios.post(
        "/cart/add",
        { productId, quantity },
        { headers: { Authorization:`${JSON.parse(localStorage.getItem("auth"))?.token}` } }
      );
      setCart(response.data);
      setLoading(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const removeFromCart = async (productId) => {
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
      alert("Your cart is empty.");
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
        directStripePayment
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
