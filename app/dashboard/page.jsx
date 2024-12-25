import Chart from "../../components/BarChart";
import DashboardCard from "../../components/DashboardCard";
import Header from "../../components/Header";
import RecentOrders from "../../components/RecentOrders";
import React from "react";
import { getGraphData } from "../../utils/getDashboardData";

const Dashboard = async () => {
  const chartData = await getGraphData();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header title={"Dashboard"} />
      <DashboardCard />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <Chart data={chartData} />

        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
