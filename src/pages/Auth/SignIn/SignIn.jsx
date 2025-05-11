import Input from "../../../components/ui/Input";
import { Link } from "react-router-dom";
import { SubmitButton } from "../../../components/ui/Button";
import AuthSideImage from "../components/AuthSideImage";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";

const SignIn = () => {
  const handle_submit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log("form data :", { email, password });
  };
  return (
    <div className="flex gap-12 justify-center min-h-dvh md:min-h-screen">
      <div className="md:w-1/2 flex flex-col justify-center items-end">
        <div className="w-full md:max-w-144 px-8 py-12">
          <AuthHeader
            title={
              <>
                SIGN <span className="text-text-body">IN</span>
              </>
            }
            description="Already have an account? Get into your account by providing the account credentials."
          />

          <form onSubmit={handle_submit} className="mt-8">
            <div className="flex flex-col gap-8">
              {/* email */}
              <Input
                name="email"
                type="email"
                label="Email address"
                placeholder="inquiry@VibeEver.com"
                is_required
              />

              {/* password */}
              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                is_required
              />
            </div>

            <h5 className="mt-3 mb-8 text-primary text-lg text-right">
              <Link to="/reset-password">Forgot password?</Link>
            </h5>

            <SubmitButton>Sign In</SubmitButton>
          </form>

          <AuthFooter
            google_handler={() => {}}
            github_handler={() => {}}
            link_content={
              <>
                Don’t have an account?
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
