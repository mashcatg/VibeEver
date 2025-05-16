const Stat = ({ number, icon, label }) => {
  return (
    <div className="w-full md:w-fit py-5 px-6 rounded-xl bg-primary">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-extrabold">{number}</h3>

        {icon}
      </div>

      <h6 className="block mt-3 w-43 uppercase font-semibold">{label}</h6>
    </div>
  );
};

const Stats = () => {
  const stats = [
    {
      number: 122,
      icon: (
        <svg className="size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path
            id="Vector"
            d="M12.32 0.6C12.09 0.23 11.68 0 11.25 0C10.81 0 10.4 0.23 10.17 0.6L6.42 6.85C6.19 7.24 6.19 7.72 6.41 8.11C6.63 8.5 7.05 8.74 7.5 8.74L15 8.74C15.44 8.74 15.86 8.5 16.08 8.11C16.3 7.72 16.3 7.24 16.07 6.85L12.32 0.6ZM11.25 12.18L11.25 17.81C11.25 18.67 11.94 19.37 12.81 19.37L18.43 19.37C19.3 19.37 20 18.67 20 17.81L20 12.18C20 11.32 19.3 10.62 18.43 10.62L12.81 10.62C11.94 10.62 11.25 11.32 11.25 12.18ZM5 20C6.32 20 7.59 19.47 8.53 18.53C9.47 17.59 10 16.32 10 15C10 13.67 9.47 12.4 8.53 11.46C7.59 10.52 6.32 10 5 10C3.67 10 2.4 10.52 1.46 11.46C0.52 12.4 0 13.67 0 15C0 16.32 0.52 17.59 1.46 18.53C2.4 19.47 3.67 20 5 20Z"
            fill="#9D73F2"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
      ),
      label: "TOTAL PRODUCTS",
    },
    {
      number: "142k",
      icon: (
        <svg className="size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path
            id="Vector"
            d="M11.25 1.25C11.25 0.55 10.69 0 10 0C9.3 0 8.75 0.55 8.75 1.25L8.75 10.73L5.88 7.86C5.39 7.37 4.6 7.37 4.11 7.86C3.62 8.35 3.62 9.14 4.11 9.63L9.11 14.63C9.6 15.12 10.39 15.12 10.88 14.63L15.88 9.63C16.37 9.14 16.37 8.35 15.88 7.86C15.39 7.37 14.6 7.37 14.11 7.86L11.25 10.73L11.25 1.25ZM2.5 13.75C1.12 13.75 0 14.87 0 16.25L0 17.5C0 18.87 1.12 20 2.5 20L17.5 20C18.87 20 20 18.87 20 17.5L20 16.25C20 14.87 18.87 13.75 17.5 13.75L13.53 13.75L11.76 15.51C10.78 16.49 9.2 16.49 8.23 15.51L6.46 13.75L2.5 13.75ZM16.87 15.93C17.12 15.93 17.36 16.03 17.53 16.21C17.71 16.38 17.81 16.62 17.81 16.87C17.81 17.12 17.71 17.36 17.53 17.53C17.36 17.71 17.12 17.81 16.87 17.81C16.62 17.81 16.38 17.71 16.21 17.53C16.03 17.36 15.93 17.12 15.93 16.87C15.93 16.62 16.03 16.38 16.21 16.21C16.38 16.03 16.62 15.93 16.87 15.93Z"
            fill="#9D73F2"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
      ),
      label: "TOTAL DOWNLOADS",
    },
    {
      number: "260k",
      icon: (
        <svg className="w-5.75 h-5.25" viewBox="0 0 23 21.5" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path
            id="Vector"
            d="M21.5 7C21.5 5.54 20.92 4.14 19.88 3.11C18.85 2.07 17.45 1.5 16 1.5C14.24 1.5 13 2 11.5 3.5C10 2 8.75 1.5 7 1.5C5.54 1.5 4.14 2.07 3.11 3.11C2.07 4.14 1.5 5.54 1.5 7C1.5 9.29 3 11.05 4.5 12.5L11.5 19.5L18.5 12.5C19.99 11.04 21.5 9.29 21.5 7Z"
            stroke="#9D73F2"
            stroke-opacity="1.000000"
            stroke-width="3.000000"
            stroke-linejoin="round"
          />
        </svg>
      ),
      label: "WISH LISTS",
    },
  ];
  return (
    <div className="mt-5 flex flex-col sm:flex-row flex-wrap md:flex-nowrap items-center gap-5 text-white">
      {stats.map((stat, index) => (
        <Stat key={index} number={stat.number} icon={stat.icon} label={stat.label} />
      ))}
    </div>
  );
};

export default Stats;
