import Input from "../../../components/ui/Input";
import { Link } from "react-router-dom";
import { SubmitButton } from "../../../components/ui/Button";
import AuthSideImage from "../components/AuthSideImage";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";

const ResetPassword = () => {
  const handle_submit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    console.log("form data :", { email });
  };
  return (
    <div className="flex gap-12 justify-center min-h-dvh md:min-h-screen">
      <div className="md:w-1/2 flex flex-col justify-center items-end">
        <div className="w-full md:max-w-144 px-8 py-12">
          <AuthHeader
            title={
              <>
                RESET <span className="text-text-body">PASSWORD</span>
              </>
            }
            description="Forgot your password? Enter your email to receive a link to reset it."
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

              <SubmitButton>SEND INSTRUCTIONS</SubmitButton>
            </div>
          </form>

          <h6 className="text-lg text-text-body mt-12 flex items-center justify-center gap-2">
            Need help?
            <Link to="/conatct" className="text-primary">
              Contact Support
            </Link>
          </h6>
        </div>
      </div>

      <AuthSideImage />
    </div>
  );
};

export default ResetPassword;
