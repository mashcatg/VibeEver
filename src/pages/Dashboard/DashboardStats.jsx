const DashboardStats = () => {
  return (
    <div className="my-5 sm:my-11.25 grid grid-cols-1 md:grid-cols-3 items-center gap-10 text-white">
      {[
        {
          label: "Total Orders",
          statNumber: 38,
          statText: (
            <>
              DOWNLOADABLE <br /> PRODUCTS
            </>
          ),
        },
        {
          label: "WISH LIST",
          statNumber: 19,
          statText: (
            <>
              IN YOUR <br /> WISH LIST
            </>
          ),
        },
        {
          label: "TRANSACTION HISTORY",
          statNumber: 22,
          statText: (
            <>
              TRANSACTIONS <br /> MADE
            </>
          ),
        },
      ].map((stat, i) => (
        <div key={i} className="w-full px-8 py-6 rounded-xl bg-primary">
          <p className="font-semibold text-white uppercase">{stat.label}</p>

          <div className="flex items-center gap-3">
            <h1 className="font-bold text-[5.0625rem] leading-[7.625rem]">
              {stat.statNumber}
            </h1>

            <h5 className="leading-4 font-semibold uppercase">
              {stat.statText}
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
