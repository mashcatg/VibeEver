import auth_bg from "../../../assets/images/auth-bg.png";

const AuthSideImage = () => {
  return (
    <>
      <div className="w-1/2 relative hidden md:block"></div>

      <div className="w-1/2 fixed size-full top-0 right-0 hidden md:block">
        <img src={auth_bg} alt="Auth Background Image" className="size-full object-cover rounded-l-5xl" />

        <h3 className="font-bold text-white text-4xl leading-14 absolute bottom-12.75 right-9 text-right">
          The Creative Marketplace <br /> for <span className="inline-block bg-primary rounded-xl px-2">Designers & Brands</span>
        </h3>
      </div>
    </>
  );
};

export default AuthSideImage;
