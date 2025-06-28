import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../layouts/Root";
import DashboardLayout from "../layouts/Dashboard";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ComponentsPage from "../pages/ComponentsPage/ComponentsPage";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import SignIn from "../pages/Auth/SignIn/SignIn";
import SignUp from "../pages/Auth/SignUp/SignUp";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import SetNewPassword from "../pages/Auth/SetNewPassword/SetNewPassword";
import ChangePassword from "../pages/Auth/ChangePassword/ChangePassword";
import EditProfile from "../pages/EditProfile/EditProfile";
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import VerifyEmail from "../pages/Auth/VerifyEmail/VerifyEmail";
import PrivateRoute from "../components/PrivateRoute";
import AddProduct from "../pages/AdminDashboard/AddProduct/AddProduct";
import ProductManage from "../pages/AdminDashboard/ProductManage/ProductManage";
import EditProduct from "../pages/AdminDashboard/EditProduct/EditProduct";
import Myprofile from "../pages/Myprofile/Myprofile";
import GoogleCallback from "../components/GoogleCallback";
import CheckoutSuccess from "../pages/Checkout/CheckoutSuccess";
import OrderManage from "../pages/AdminDashboard/OrderManage/OrderManage";
import CategoryManage from "../pages/AdminDashboard/CategoryManage/CategoryManage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products/> ,
      },
      {
        path: "/products/:id",
        element: <PrivateRoute>
           <ProductDetails></ProductDetails>
        </PrivateRoute>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute role="user">
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/verify-email/:token",
        element: <VerifyEmail></VerifyEmail>,
      },
      {
        path: "/auth/success",
        element:  <GoogleCallback/>,
      }
    ],
  },
  {
    path: "/edit-profile",
    element: (
      <PrivateRoute>
        <EditProfile />
      </PrivateRoute>
    ),
  },
  
      {
        path: "/checkout/success",
        element:  <CheckoutSuccess/>,
      },
  {
    path: "/MY-profile",
    element: (
      <PrivateRoute>
        <Myprofile />
      </PrivateRoute>
    ),
  },
  {
    path: "/sign-in",
    element: <SignIn></SignIn>,
  },
  {
    path: "/sign-up",
    element: <SignUp></SignUp>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword></ResetPassword>, // note: reset and set new password are related
  },
  {
    path: "/set-new-password/:token",
    element: <SetNewPassword></SetNewPassword>,
  },
  {
    path: "/change-password",
    element: (
      <PrivateRoute>
        <ChangePassword />
      </PrivateRoute>
    ),
  },
  {
    path: "admin-dashboard",
    element: (
      <PrivateRoute role="admin">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute role="admin">
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute role="admin">
            <ProductManage />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-product/:id",
        element: (
          <PrivateRoute role="admin">
            <EditProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute role="admin">
            <OrderManage />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-categories",
        element: (
          <PrivateRoute role="admin">
            <CategoryManage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
