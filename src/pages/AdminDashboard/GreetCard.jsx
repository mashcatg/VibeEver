const GreetCard = () => {
  return (
    <div className="p-6 rounded-xl bg-neutral-subtle w-fit">
      <h3 className="font-extrabold">
        Hello, <span className="text-primary">Arnob</span>
      </h3>

      <p className="mt-2 sm:w-96.5">Welcome to your dashboard. From here you can manage your products and orders.</p>
    </div>
  );
};

export default GreetCard;
