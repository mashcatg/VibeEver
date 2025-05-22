import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../../../components/ui/Button";
import AuthSideImage from "../components/AuthSideImage";
import AuthHeader from "../components/AuthHeader";
import Input from "../../../components/ui/Input";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axios = useAxios();

  const handle_submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const current_password = form.current_password.value;
    const new_password = form.new_password.value;
    const confirm_password = form.confirm_password.value;

    if (new_password !== confirm_password) {
      return toast.error("New passwords don't match");
    }

    try {
      setLoading(true);
      // Get token from localStorage
      // const token = JSON.parse(localStorage.getItem("auth"))?.token;

      const response = await axios.put(
        "/auth/change-password",
        {
          currentPassword: current_password,
          newPassword: new_password,
        }       );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/my-profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
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

              <SubmitButton disabled={loading}>
                {loading ? "Changing Password..." : "Change Password"}
              </SubmitButton>
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
