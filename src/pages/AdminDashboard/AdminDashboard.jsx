import { useState, useEffect } from "react";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import GreetCard from "./GreetCard";
import Stats from "./Stats";
import Chart from "./Chart";
import RecentUsers from "./RecentUsers";
import TrendingProducts from "./TrendingProducts";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1)
      .toISOString()
      .split("T")[0], // First day of current year
    endDate: new Date().toISOString().split("T")[0], // Today
  });
  const axios = useAxios();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/orders/analytics?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
        );
        setAnalytics(response.data);
      } catch (error) {
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [axios, dateRange]);

  const handleDateRangeChange = (start, end) => {
    setDateRange({
      startDate: start,
      endDate: end,
    });
  };

  return (
    <div>
      <GreetCard />

      <Stats summary={analytics?.summary} loading={loading} />

      <div className="mt-10 grid gap-5 grid-cols-1 md:grid-cols-2">
        <Chart
          dailyRevenue={analytics?.dailyRevenue}
          loading={loading}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />

        <RecentUsers />
      </div>

      <TrendingProducts />
    </div>
  );
};

export default AdminDashboard;
