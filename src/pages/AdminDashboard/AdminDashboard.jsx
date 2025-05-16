import GreetCard from "./GreetCard";
import Stats from "./Stats";
import Chart from "./Chart";
import RecentUsers from "./RecentUsers";
import TrendingProducts from "./TrendingProducts";

const AdminDashboard = () => {
  return (
    <div>
      <GreetCard />

      <Stats />

      <div className="mt-10 grid gap-5 grid-cols-1 md:grid-cols-2">
        <Chart />

        <RecentUsers />
      </div>

      <TrendingProducts />
    </div>
  );
};

export default AdminDashboard;
