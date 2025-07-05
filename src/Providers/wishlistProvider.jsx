import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/wishlist", {
        headers: { Authorization: `${token}` },
      });
      setWishlist(res.data.products || []);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
      toast.error("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const res = await axios.post(
        "/wishlist/toggle",
        { productId },
        {
          headers: { Authorization: `${token}` },
        }
      );

      const { inWishlist, message } = res.data;

      if (inWishlist) {
        setWishlist((prev) => [...prev, { _id: productId }]);
        toast.success("Added to wishlist");
      } else {
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        toggleWishlist,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
