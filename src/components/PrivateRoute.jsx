import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  console.log(user);
  const location = useLocation();
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        loading...
        {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div> */}
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;