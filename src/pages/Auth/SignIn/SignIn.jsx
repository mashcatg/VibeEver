import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../components/ui/Input";
import { SubmitButton } from "../../../components/ui/Button";
import AuthSideImage from "../components/AuthSideImage";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import { useAuth } from "../../../Providers/AuthProvider";
import toast from "react-hot-toast";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
   

  const handle_submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setError("Please fill all required fields");
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      const response = await signIn(email, password);
      toast.success("Successfully signed in!");
      navigate('/'); // or your dashboard route
    } catch (err) {
      const errorMessage = err.message || "Sign in failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-12 justify-center min-h-dvh md:min-h-screen">
      <div className="md:w-1/2 flex flex-col justify-center items-end">
        <div className="w-full md:max-w-144 px-8 py-12">
          <AuthHeader
            title={
              <>
                SIGN <span className="text-text-body">In</span>
              </>
            }
            description="Welcome back! Please sign in to your account."
          />

          {error && (
            <div className="text-red-500 text-sm mt-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handle_submit} className="mt-8">
            <div className="flex flex-col gap-8">
              <Input
                name="email"
                type="email"
                label="Email address"
                placeholder="inquiry@VibeEver.com"
                is_required
                disabled={loading}
              />

              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                is_required
                disabled={loading}
              />

              <div className="text-right">
                <Link
                  to="/reset-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <SubmitButton disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </SubmitButton>
            </div>
          </form>

          <AuthFooter
            google_handler={googleSignIn}
            github_handler={() => {}}
            link_content={
              <>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-primary">
                  Sign Up Now
                </Link>
              </>
            }
          />
        </div>
      </div>

      <AuthSideImage />
    </div>
  );
};

export default SignIn;