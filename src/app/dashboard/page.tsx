"use client";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ShoppingCart, Package, DollarSign, Users } from "lucide-react";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Define types
type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
};

type Order = {
  id: string;
  customer: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
};

type Product = {
  name: string;
  sales: number;
};

const Dashboard: React.FC = () => {
  // Mock data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "#1C658C",
      },
    ],
  };

  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [8, 15, 7, 12, 9, 14],
        borderColor: "#398AB9",
        tension: 0.1,
      },
    ],
  };

  const recentOrders: Order[] = [
    { id: "#12345", customer: "John Doe", amount: 1200, status: "Completed" },
    { id: "#12346", customer: "Jane Smith", amount: 850, status: "Pending" },
    {
      id: "#12347",
      customer: "Bob Johnson",
      amount: 2300,
      status: "Completed",
    },
  ];

  const topProducts: Product[] = [
    { name: "Product A", sales: 250 },
    { name: "Product B", sales: 180 },
    { name: "Product C", sales: 150 },
  ];

  return (
    <div className="bg-[#EEEEEE] min-h-screen">
      <nav className="bg-[#1C658C] p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">B2B Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Link
            href="/addNewProduct"
            className="text-white hover:text-gray-300"
          >
            <button className="bg-[#F28C28] text-white px-4 py-2 rounded hover:bg-[#d77a1e] flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Add New Product
            </button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Sales"
            value="$54,350"
            icon={<DollarSign />}
            color="bg-[#398AB9]"
          />
          <StatCard
            title="Orders"
            value="1,250"
            icon={<ShoppingCart />}
            color="bg-[#1C658C]"
          />
          <StatCard
            title="Products"
            value="186"
            icon={<Package />}
            color="bg-[#398AB9]"
          />
          <StatCard
            title="Customers"
            value="864"
            icon={<Users />}
            color="bg-[#1C658C]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
            <Bar data={salesData} options={{ responsive: true }} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Orders Trend</h2>
            <Line data={ordersData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#D8D2CB] text-[#1C658C]">
                    <th className="p-2 text-left">Order ID</th>
                    <th className="p-2 text-left">Customer</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="p-2">{order.id}</td>
                      <td className="p-2">{order.customer}</td>
                      <td className="p-2">${order.amount}</td>
                      <td className="p-2">
                        <span
                          className={`py-1 px-2 rounded-full text-sm ${
                            order.status === "Completed"
                              ? "bg-green-200 text-green-800"
                              : order.status === "Pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Products</h2>
            <ul>
              {topProducts.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 pb-2 border-b last:border-b-0"
                >
                  <span>{product.name}</span>
                  <span className="bg-[#398AB9] text-white py-1 px-2 rounded-full text-sm">
                    {product.sales} sold
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div
      className={`${color} text-white p-4 rounded-lg shadow-md flex items-center justify-between`}
    >
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
};

export default Dashboard;
