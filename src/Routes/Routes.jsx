import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../layouts/Root";
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
        element: <Products></Products>,
      },
      {
        path: "/products/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
      }
    ],
  },
  {
    path: "/edit-profile",
    element: <EditProfile></EditProfile>,
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
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword></SetNewPassword>,
  },
  {
    path: "/change-password",
    element: <ChangePassword></ChangePassword>,
  },
  // {
  //   path: "/components",
  //   element: <ComponentsPage></ComponentsPage>,
  // },
]);
