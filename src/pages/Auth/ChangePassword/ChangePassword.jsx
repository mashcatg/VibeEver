import Input from "../../../components/ui/Input";
import { Link } from "react-router-dom";
import { SubmitButton } from "../../../components/ui/Button";
import AuthSideImage from "../components/AuthSideImage";
import AuthHeader from "../components/AuthHeader";

const ChangePassword = () => {
  const handle_submit = (e) => {
    e.preventDefault();
    const form = e.target;
    const current_password = form.current_password.value;
    const new_password = form.new_password.value;
    const confirm_password = form.confirm_password.value;

    console.log("form data :", {
      current_password,
      new_password,
      confirm_password,
    });
  };
  return (
    <div className="flex gap-12 justify-center min-h-dvh md:min-h-screen">
      <div className="md:w-1/2 flex flex-col justify-center items-end">
        <div className="w-full md:max-w-144 px-8 py-12">
          <AuthHeader
            title={
              <>
                CHANGE <span className="text-text-body">PASSWORD</span>
              </>
            }
            description="Changing your password helps keep your account secure. Enter a new password to continue."
          />

          <form onSubmit={handle_submit} className="mt-8">
            <div className="flex flex-col gap-8">
              {/* current password */}
              <Input
                name="current_password"
                type="password"
                label="Current Password"
                placeholder="********"
                is_required
              />

              <hr className="border-neutral-default" />

              {/* new password */}
              <Input
                name="new_password"
                type="password"
                label="New Password"
                placeholder="********"
                is_required
              />

              {/* Confirm password */}
              <Input
                name="confirm_password"
                type="password"
                label="Confirm new Password"
                placeholder="********"
                is_required
              />

              <SubmitButton>Change Password</SubmitButton>
            </div>
          </form>

          <h6 className="text-lg text-text-body mt-12 flex items-center justify-center gap-2">
            Forgot current password?
            <Link to="/reset-password" className="text-primary">
              Reset It Now
            </Link>
          </h6>
        </div>
      </div>

      <AuthSideImage />
    </div>
  );
};

export default ChangePassword;
