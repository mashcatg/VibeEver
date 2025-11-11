import { Fragment } from "react";
import toast from "react-hot-toast";

const Stat = ({ number, icon, label }) => {
  const num = typeof number === "number" ? number : parseFloat(number.replace(/[^0-9.-]+/g, ""));
  if (num >= 1000000) {
    number = (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    number = (num / 1000).toFixed(1) + "K";
  }
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

const Stats = ({ summary, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-5  text-white  mt-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full md:w-fit py-5 px-6 rounded-xl bg-primary text-white animate-pulse">
            <div className="h-8 w-32 bg-primary rounded"></div>
            <div className="h-6 w-24 bg-primary rounded mt-3"></div>
          </div>
        ))}
      </div>
    );
  }

  console.log(summary, "summary");

  const statsData = [
    {
      number: `$${summary?.totalRevenue?.toFixed(2) || "0.00"}`,
      label: "Total Revenue",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      number: summary?.totalOrders || 0,
      label: "Total Orders",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      number: `$${summary?.averageOrderValue?.toFixed(2) || "0.00"}`,
      label: "Average Order",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row text-white/90 gap-5 w-full">
      {statsData.map((stat, index) => (
        <Stat key={index} number={stat.number} icon={stat.icon} label={stat.label} />
      ))}
    </div>
  );
};

export default Stats;
