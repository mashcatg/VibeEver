import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import { Link } from "react-router-dom";
import { SubmitButton } from "../../../components/ui/Button";
import AuthSideImage from "../components/AuthSideImage";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import { useAuth } from "../../../Providers/AuthProvider";
import toast from "react-hot-toast";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handle_submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target;
    const full_name = form.full_name.value;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await createUser(full_name, email, password);
      console.log("Registration successful:", response);
      toast.success(response.message)
      // Show success message or redirect
      navigate('/sign-in');
    } catch (err) {
      setError(err.message || "Registration failed");
      console.error("Registration error:", err);
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
                SIGN <span className="text-text-body">Up</span>
              </>
            }
            description="Don't have an account? Get an account by providing the account credentials."
          />

          {error && (
            <div className="text-red-500 text-sm mt-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handle_submit} className="mt-8">
            <div className="flex flex-col gap-8">
              {/* full name */}
              <Input
                name="full_name"
                type="text"
                label="Full name"
                placeholder="Anisur R."
                is_required
                disabled={loading}
              />

              {/* Username */}
              <Input
                name="username"
                type="text"
                label="Username"
                placeholder="anisur123"
                is_required
                disabled={loading}
              />

              {/* email */}
              <Input
                name="email"
                type="email"
                label="Email address"
                placeholder="inquiry@VibeEver.com"
                is_required
                disabled={loading}
              />

              {/* password */}
              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                is_required
                disabled={loading}
              />

              <SubmitButton disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </SubmitButton>
            </div>
          </form>

          <AuthFooter
            google_handler={() => {}}
            github_handler={() => {}}
            link_content={
              <>
                Already have an account?
                <Link to="/sign-in" className="text-primary">
                  Sign In Now
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

export default SignUp;
