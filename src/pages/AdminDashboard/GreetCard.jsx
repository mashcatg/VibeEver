import { useAuth } from "../../Providers/AuthProvider";

const GreetCard = () => {
  const { user } = useAuth();
  const formate = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    if (window.innerWidth <= 768) return name;
    if (window.innerWidth >= 1536) return names[0] + " " + names[1].charAt(0).toUpperCase() + ".";
    return names[0].charAt(0).toUpperCase() + ".";
  };
  return (
    <div className="p-6 rounded-xl bg-neutral-subtle w-fit md:w-[35%] 2xl:w-1/2">
      <h3 className="font-extrabold">
        Hello, <span className="text-primary">{formate(user?.fullName)}</span>
      </h3>

      <p className="mt-2">Welcome to your dashboard. From here you can manage your products and orders.</p>
    </div>
  );
};

export default GreetCard;
