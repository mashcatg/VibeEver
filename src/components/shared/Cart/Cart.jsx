import product from "../../../assets/images/product.jpeg";
import { useState, useRef, useEffect } from "react";
import Divider from "../../ui/Divider";

const Cart = ({ open_cart, set_open_cart }) => {
  const cart_ref = useRef(null);
  const cart = [
    {
      id: 1,
      name: "Wordpress Portfolio Website Demo Template Bundle 1",
      price: 12.8,
      image: product,
      isChecked: false,
    },
    {
      id: 2,
      name: "Wordpress Portfolio Website Demo Template Bundle 2",
      price: 15.5,
      image: product,
      isChecked: false,
    },
  ];

  const discount = 2;

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
  return (
    <div className={`fixed top-0 right-0 z-50 w-full h-full transition-all duration-300 ease-in-out ${open_cart ? "translate-x-0" : "translate-x-[110%]"}`}>
      {/* overlay */}
      {/* <div 
      className={`absolute top-0 left-0 w-full h-full bg-transparent cursor-pointer transition-all duration-300 ease-in-out ${open_cart ? "opacity-100" : "opacity-0"}`} 
      onClick={() => set_open_cart(false)}></div> */}

      <div
        ref={cart_ref}
        className="absolute top-0 right-0 h-full bg-white p-8 sm:p-16 rounded-l-5xl flex flex-col gap-12 justify-between overflow-y-auto"
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
            {cart.map((item, index) => (
              <>
                <CartItem key={item.id} item={item} />
                {/* Add divider only if it's not the last product */}
                {index < cart.length - 1 && <Divider />}
              </>
            ))}
          </div>
        </div>

        <div>
          <from className="p-6 bg-white flex justify-between items-center gap-4.5 rounded-xl border border-neutral-default text-xl leading-body text-text-body">
            <div className="py-3 px-5 w-full rounded-full bg-neutral-subtle">
              <input type="text" placeholder="Enter Coupon Code" className="w-full outline-0" />
            </div>

            <button type="submit" className="bg-primary py-3 px-5 rounded-full text-white font-bold">
              REDEEM
            </button>
          </from>

          <div className="py-12 text-text-body">
            <div className="flex flex-col gap-1">
              {/*  Total Amount */}
              <div className="flex items-center justify-between gap-6">
                <h5 className="text-headline leading-headline">Total Amount</h5>
                <h5 className="text-headline leading-headline font-bold">$ {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</h5>
              </div>

              {/*  Discount */}
              <div className="flex items-center justify-between gap-6">
                <h5 className="text-headline leading-headline">Discount</h5>
                <h5 className="text-headline leading-headline font-bold">$ {discount.toFixed(2)}</h5>
              </div>
            </div>

            <Divider />

            {/* Final Total Amount */}
            <div className="flex items-center justify-between gap-6">
              <h5 className="text-headline leading-headline font-bold">Total Amount</h5>
              <h5 className="text-headline leading-headline font-bold text-primary">
                $ {(cart.reduce((total, item) => total + item.price, 0) - discount).toFixed(2)}
              </h5>
            </div>
          </div>

          <button className="w-full px-8 py-6 bg-primary rounded-full text-xl leading-body font-bold text-white">CONTINUE PAYMENT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

const CartItem = ({ item }) => {
  const [checked, setChecked] = useState(item.isChecked);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-start justify-between gap-3 md:gap-11.25">
      <div className="max-w-99.25 flex items-start gap-3">
        <label className="inline-flex items-center cursor-pointer">
          {/* Hidden native checkbox */}
          <input type="checkbox" className="hidden" checked={checked} onChange={handleChange} />

          {/* Custom checkbox */}
          <span
            className={`w-6 h-6 inline-flex items-center justify-center border rounded-sm ${
              checked ? "bg-primary border-primary" : "bg-white hover:bg-[#efe8fd] border-neutral-default hover:border-[#efe8fd]"
            } transition-all duration-300 ease-in-out`}
          >
            <svg className="w-4.5 h-3.5" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 8L6 12L16 2" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </label>

        <div className="max-w-15 sm:max-w-25 max-h-16 overflow-hidden rounded-sm">
          <img src={item.image} alt="Product Image" className="w-full h-full object-cover rounded-sm" />
        </div>

        <h5 className="text-text-body">{item.name}</h5>
      </div>

      <div>
        <h5 className="text-text-body font-semibold w-max">$ {item.price.toFixed(2)}</h5>
      </div>
    </div>
  );
};
