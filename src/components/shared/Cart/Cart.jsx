import { useState, useRef, useEffect } from "react";
import { useCart } from "../../../Providers/cartProvider";
import Divider from "../../ui/Divider";
import useAxios from "../../../Hooks/useAxios";

const Cart = ({ open_cart, set_open_cart }) => {
  const cart_ref = useRef(null);
  const { cart, loading, updateQuantity, removeFromCart, applyCoupon } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const axios = useAxios()

  const handleStripeCartPayment = async ()=>{

    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await axios.post("/orders/create-checkout-session");

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("No URL returned from Stripe API");
      }
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      alert("Failed to create payment session. Please try again.");
    }



  }

  // Handle coupon submission
  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    await applyCoupon(couponCode);
    setCouponCode("");
  };

  const handleClickOutside = (event) => {
    if (cart_ref.current && !cart_ref.current.contains(event.target)) {
      set_open_cart(false);
    }
  };

  // Close cart when clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 right-0 z-50 w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={`fixed top-0 z-50 w-full h-full transition-all duration-300 ease-in-out ${open_cart ? "translate-x-0 -right-0" : "translate-x-[110%] -right-1000"}`}>
      <div
        ref={cart_ref}
        className={`absolute top-0 ${open_cart ? "-right-0" : "-right-1000"} h-full bg-white p-8 sm:p-16 rounded-l-5xl flex flex-col gap-12 justify-between overflow-y-auto`}
        style={{
          boxShadow: "-0.25rem 0rem 0.125rem 0rem rgba(0, 0, 0, 0.04),-2rem 0rem 1rem -0.25rem rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <div className="flex items-center justify-between gap-5">
            <h3 className="text-primary font-extrabold">
              SHOPPING <span className="text-text-body">CART</span>
            </h3>

            <button className="md:hidden text-text-body font-bold text-xl leading-body" onClick={() => set_open_cart(false)} aria-label="Close cart">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="mt-3 px-6 py-4 bg-primary text-white rounded-t-xl flex gap-5 justify-between">
            <h5 className="font-bold text-xl leading-body">PRODUCTS</h5>

            <h6 className="font-semibold text-lg leading-6.75">PRICE</h6>
          </div>

          <div className="p-6 bg-neutral-subtle rounded-b-xl flex flex-col">
            {cart?.items?.map((item, index) => (
              <>
                <CartItem 
                  key={item.product._id} 
                  item={{
                    id: item.product._id,
                    name: item.product.title,
                    price: item.product.finalPrice,
                    image: item.product.thumbnailUrls[0],
                    quantity: item.quantity
                  }}
                  onQuantityChange={(qty) => updateQuantity(item.product._id, qty)}
                  onRemove={() => removeFromCart(item.product._id)}
                />
                {index < cart.items.length - 1 && <Divider />}
              </>
            ))}
          </div>
        </div>

        <div>
          <form onSubmit={handleCouponSubmit} className="p-6 bg-white flex justify-between items-center gap-4.5 rounded-xl border border-neutral-default text-xl leading-body text-text-body">
            <div className="py-3 px-5 w-full rounded-full bg-neutral-subtle">
              <input 
                type="text" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter Coupon Code" 
                className="w-full outline-0 bg-transparent" 
              />
            </div>

            <button type="submit" className="bg-primary py-3 px-5 rounded-full text-white font-bold">
              REDEEM
            </button>
          </form>

          <div className="py-12 text-text-body">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-6">
                <h5 className="text-headline leading-headline">Total Amount</h5>
                <h5 className="text-headline leading-headline font-bold">
                  $ {cart?.subtotal?.toFixed(2) || '0.00'}
                </h5>
              </div>

              <div className="flex items-center justify-between gap-6">
                <h5 className="text-headline leading-headline">Discount</h5>
                <h5 className="text-headline leading-headline font-bold">
                  $ {cart?.discount?.toFixed(2) || '0.00'}
                </h5>
              </div>
            </div>

            <Divider />

            <div className="flex items-center justify-between gap-6">
              <h5 className="text-headline leading-headline font-bold">Total Amount</h5>
              <h5 className="text-headline leading-headline font-bold text-primary">
                $ {cart?.total?.toFixed(2) || '0.00'}
              </h5>
            </div>
          </div>

          <button onClick={handleStripeCartPayment} className="w-full px-8 py-6 bg-primary rounded-full text-xl leading-body font-bold text-white">
            CONTINUE PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-start justify-between gap-3 md:gap-11.25">
      <div className="max-w-99.25 flex items-start gap-3">
        <div className="max-w-15 sm:max-w-25 max-h-16 overflow-hidden rounded-sm">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-sm" />
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="text-text-body">{item.name}</h5>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))}
              className="p-1 rounded-full hover:bg-neutral-default"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button 
              onClick={() => onQuantityChange(item.quantity + 1)}
              className="p-1 rounded-full hover:bg-neutral-default"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <h5 className="text-text-body font-semibold">
          $ {(item.price * item.quantity).toFixed(2)}
        </h5>
        <button 
          onClick={onRemove}
          className="text-red-500 hover:text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Cart;
