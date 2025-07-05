import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { AuthProvider } from "./Providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./Providers/cartProvider";
import { WishlistProvider } from "./Providers/wishlistProvider";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<CartProvider>
				<WishlistProvider>
					<RouterProvider router={router} />
				</WishlistProvider>
			</CartProvider>
			<Toaster />
		</AuthProvider>
	</StrictMode>
);
