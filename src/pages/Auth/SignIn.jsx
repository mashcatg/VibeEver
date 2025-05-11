import logo from "../../assets/images/logo.svg";
import Input from "../../components/ui/Input";
import auth_bg from "../../assets/images/auth-bg.png";

const SignIn = () => {
  return (
    <div className="flex gap-12 justify-center min-h-screen">
      <div className="w-1/2 flex flex-col justify-center items-end">
        <div className="w-full max-w-144 px-8 py-12">
          <div className="max-w-38.5 mb-12">
            <img src={logo} alt="Vibe Ever Logo" className="w-full" />
          </div>

          <h2 className="font-bold text-primary mb-3">
            SIGN <span className="text-text-body">IN</span>
          </h2>

          <p className="text-neutral-caption text-xl leading-body">Already have an account? Get into your account by providing the account credentials.</p>

          <form className="mt-8">
            <div className="flex flex-col gap-8">
              {/* email */}
              <Input name="email" type="email" label="Email address" placeholder="inquiry@VibeEver.com" is_required />

              {/* password */}
              <Input name="password" type="password" label="Password" placeholder="********" is_required />
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/2 relative">
        <img src={auth_bg} alt="Auth Background Image" className="size-full object-cover rounded-l-5xl" />

        <h3 className="font-bold text-white text-4xl leading-14 absolute bottom-12.75 right-9 text-right">
          The Creative Marketplace <br /> for <span className="inline-block bg-primary rounded-xl px-2">Designers & Brands</span>
        </h3>
      </div>
    </div>
  );
};

export default SignIn;
