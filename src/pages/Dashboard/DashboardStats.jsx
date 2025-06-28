import { useState, useEffect } from 'react';
import useAxios from "../../Hooks/useAxios";

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axios = useAxios();
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/profile/get-stats',  {
            headers: {
              Authorization: `${token}`,
            }});
        // console.log(response.data, "stats response");
        setStats(response.data);
        setError(null);
      } catch (err) {
        // console.error('Error fetching stats:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axios, token]);

  // Extract stats from API response or use defaults
  const stat = stats?.stats || {
    totalOrders: 0,
    totalProducts: 0,
    totalTransactions: 0
  };

  const statsConfig = [
    {
      label: "Total Orders",
      statNumber: stat.totalOrders,
      statText: (
        <>
          DOWNLOADABLE <br /> PRODUCTS
        </>
      ),
    },
    {
      label: "TOTAL PRODUCTS",
      statNumber: stat.totalProducts,
      statText: (
        <>
          PRODUCTS <br /> PURCHASED
        </>
      ),
    },
    {
      label: "TRANSACTION HISTORY",
      statNumber: stat.totalTransactions,
      statText: (
        <>
          TRANSACTIONS <br /> MADE
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="my-5 sm:my-11.25 grid grid-cols-1 md:grid-cols-3 items-center gap-10 text-white">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="w-full px-8 py-6 rounded-xl bg-primary animate-pulse">
            <div className="h-4 bg-gray-600 rounded mb-4"></div>
            <div className="flex items-center gap-3">
              <div className="h-20 w-20 bg-gray-600 rounded"></div>
              <div className="h-8 w-24 bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-5 sm:my-11.25 text-white text-center">
        <p className="text-red-400">Failed to load dashboard stats</p>
      </div>
    );
  }

  return (
    <div className="my-5 sm:my-11.25 grid grid-cols-1 md:grid-cols-3 items-center gap-10 text-white">
      {statsConfig.map((stat, i) => (
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