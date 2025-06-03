import { useState } from "react";
import Input from "../../components/ui/Input";
import { SubmitButton } from "../../components/ui/Button";
import AuthSideImage from "../Auth/components/AuthSideImage";
import AuthHeader from "../Auth/components/AuthHeader";
import demo_preview from "../../assets/images/upload-preview-demo.png";
import useUpdateProfile from "../../Hooks/useUpdateProfile";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [previewImage, setPreviewImage] = useState(demo_preview);
  const { updateProfile, loading } = useUpdateProfile();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    if (url) {
      setPreviewImage(url);
    }
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updateData = {
      fullName: form.full_name.value,
      userName: form.username.value,
      email: form.email.value,
      phoneNumber: form.phone_number.value,
      bio: form.bio.value,
      image: form.image_url.value || previewImage,
    };

    try {
      await updateProfile(updateData);
      navigate("/my-profile");  
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="flex gap-12 justify-center min-h-dvh md:min-h-screen">
      <div className="md:w-1/2 flex flex-col justify-center items-end">
        <div className="w-full md:max-w-144 px-8 py-12">
          <AuthHeader
            title={
              <>
                EDIT <span className="text-text-body">YOUR PROFILE</span>
              </>
            }
            description="Update your personal information to keep your profile up to date."
          />

          <form onSubmit={handle_submit} className="mt-8">
            <div className="flex flex-col gap-8">
              {/* full name */}
              <Input
                name="full_name"
                type="text"
                label="Full name"
                placeholder="Anisur R."
              />

              {/* Username */}
              <Input
                name="username"
                type="text"
                label="Username"
                placeholder="anisur123"
              />

              {/* email */}
              <Input
                name="email"
                type="email"
                label="Email address"
                placeholder="inquiry@VibeEver.com"
              />

              {/* phone number */}
              <Input
                name="phone_number"
                type="tel"
                label="Phone number"
                placeholder="+123 456 789"
              />

              {/* Image upload and preview section */}
              <div className="flex items-center justify-center gap-6 flex-col md:flex-row">
                <div className="min-w-24 size-24 rounded-full border-2 border-neutral-border overflow-hidden">
                  <img
                    src={previewImage}
                    alt="profile preview"
                    className="size-full object-cover rounded-full"
                    onError={() => setPreviewImage(demo_preview)}
                  />
                </div>

                <div className="w-full space-y-4">
                  <div className="relative w-full">
                    <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-8">
                      <svg
                        className="size-5"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.00109 8.3811C8.3155 8.3811 9.3811 7.31553 9.3811 6.00109C9.3811 4.68666 8.3155 3.62109 7.00109 3.62109C5.68666 3.62109 4.62109 4.68666 4.62109 6.00109C4.62109 7.31553 5.68666 8.3811 7.00109 8.3811Z"
                          fill="#372F46"
                        />
                        <path
                          d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.19C0 15.28 0.19 16.23 0.56 17.03C1.42 18.93 3.26 20 5.81 20H14.19C17.83 20 20 17.83 20 14.19V5.81C20 2.17 17.83 0 14.19 0ZM18.37 10.5C17.59 9.83 16.33 9.83 15.55 10.5L11.39 14.07C10.61 14.74 9.35 14.74 8.57 14.07L8.23 13.79C7.52 13.17 6.39 13.11 5.59 13.65L1.85 16.16C1.63 15.6 1.5 14.95 1.5 14.19V5.81C1.5 2.99 2.99 1.5 5.81 1.5H14.19C17.01 1.5 18.5 2.99 18.5 5.81V10.61L18.37 10.5Z"
                          fill="#372F46"
                        />
                      </svg>
                    </div>
                    <input
                      type="file"
                      name="profile_picture"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full cursor-pointer pl-16 bg-neutral-subtle py-6 px-8 rounded-full border-2 hover:border-4 focus:border-2 border-dashed focus:border-solid outline-0 border-neutral-default focus:border-neutral-border transition-all duration-300"
                    />
                  </div>

                  <div className="relative w-full">
                    <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-8">
                      <svg
                        className="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z"
                          fill="#372F46"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12Z"
                          fill="#372F46"
                        />
                      </svg>
                    </div>
                    <input
                      type="url"
                      name="image_url"
                      placeholder="Or paste image URL here"
                      onChange={handleImageUrlChange}
                      className="w-full pl-16 bg-neutral-subtle py-6 px-8 rounded-full border-2 hover:border-4 focus:border-2 border-dashed focus:border-solid outline-0 border-neutral-default focus:border-neutral-border transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* bio */}
              <Input
                name="bio"
                type="textarea"
                label="Bio or About"
                placeholder="Write your message here..."
              />

              <SubmitButton disabled={loading}>
                {loading ? "UPDATING..." : "UPDATE PROFILE"}
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>

      <AuthSideImage />
    </div>
  );
};

export default EditProfile;