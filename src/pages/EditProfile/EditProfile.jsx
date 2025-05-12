import Input from "../../components/ui/Input";
import { SubmitButton } from "../../components/ui/Button";
import AuthSideImage from "../Auth/components/AuthSideImage";
import AuthHeader from "../Auth/components/AuthHeader";
import demo_preview from "../../assets/images/upload-preview-demo.png";

const EditProfile = () => {
  const handle_submit = (e) => {
    e.preventDefault();
    const form = e.target;
    const full_name = form.full_name.value;
    const username = form.username.value;
    const email = form.email.value;
    const phone_number = form.phone_number.value;
    const bio = form.bio.value;

    console.log("form data :", {
      full_name,
      username,
      email,
      phone_number,
      bio,
      profile_picture: form.profile_picture.value,
    });
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
                is_required
              />

              {/* Username */}
              <Input
                name="username"
                type="text"
                label="Username"
                placeholder="anisur123"
                is_required
              />

              {/* email */}
              <Input
                name="email"
                type="email"
                label="Email address"
                placeholder="inquiry@VibeEver.com"
                is_required
              />

              {/* phone number */}
              <Input
                name="phone_number"
                type="tel"
                label="Phone number"
                placeholder="+123 456 789"
                is_required
              />

              <div className="flex items-center justify-center gap-6">
                <div className="min-w-24 size-24 rounded-full border-2 border-neutral-border">
                  <img
                    src={demo_preview}
                    alt="upload preview"
                    className="size-full object-cover"
                  />
                </div>

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
                    className="w-full cursor-pointer pl-16 bg-neutral-subtle py-6 px-8 rounded-full border-2 hover:border-4 focus:border-2 border-dashed focus:border-solid outline-0 border-neutral-default focus:border-neutral-border transition-all duration-300"
                  />
                </div>
              </div>

              {/* bio */}
              <Input
                name="bio"
                type="textarea"
                label="Bio or About"
                placeholder="Write your message here..."
                is_required
              />

              <SubmitButton>UPDATE PROFILE</SubmitButton>
            </div>
          </form>
        </div>
      </div>

      <AuthSideImage />
    </div>
  );
};

export default EditProfile;
