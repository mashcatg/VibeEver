import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { useEffect } from "react";

 

const GoogleCallback = () => {
  const { handleGoogleCallback } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log("GoogleCallback params:", params);
    const token = params.get("token");
    const redirect = params.get("redirect") || "/";

    if (token) {
      handleGoogleCallback(token)
        .then(() => navigate(redirect, { replace: true }))
        .catch(() => navigate("/sign-in", { replace: true }));
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, []);

  return <div>Signing you in...</div>;
};

export default GoogleCallback;