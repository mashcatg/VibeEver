import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div> ; // or a spinner

  if (!user) {
    // Redirect to sign-in with the intended path
    return (
      <Navigate
        to={`/sign-in?redirect=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;