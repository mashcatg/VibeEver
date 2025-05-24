import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SubmitButton } from "../../../components/ui/Button";
import AuthSideImage from "../components/AuthSideImage";
import AuthHeader from "../components/AuthHeader";
import Input from "../../../components/ui/Input";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";

const SetNewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const handle_submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;

    if (password !== confirmPassword) {
      return toast.error("Passwords don't match");
    }

    try {
      setLoading(true);
      const response = await axios.post(`/auth/reset-password/${token}`, {
        password,
      });
      toast.success(response.data.message);
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
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
                SET NEW <span className="text-text-body">PASSWORD</span>
              </>
            }
            description="Enter your new password below to reset your account password."
          />

          <form onSubmit={handle_submit} className="mt-8">
            <div className="flex flex-col gap-8">
              <Input
                name="password"
                type="password"
                label="New Password"
                placeholder="********"
                is_required
              />

              <Input
                name="confirm_password"
                type="password"
                label="Confirm Password"
                placeholder="********"
                is_required
              />

              <SubmitButton disabled={loading}>
                {loading ? "RESETTING..." : "RESET PASSWORD"}
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>

      <AuthSideImage />
    </div>
  );
};

export default SetNewPassword;
