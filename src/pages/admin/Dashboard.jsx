import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, [range]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/dashboard?range=${range}`);
      setStats(res.data);
    } catch (error) {
      console.error("Dashboard load failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!stats) return <p>Error loading data</p>;

  const roomTotal = stats.roomStats.occupied + stats.roomStats.available;
  const permissionTotal =
    stats.permissionStats.approved +
    stats.permissionStats.pending +
    stats.permissionStats.rejected;

  const roomData = [
    {
      name: "Occupied",
      value: stats.roomStats.occupied,
      //percent: ((stats.roomStats.occupied / roomTotal) * 100).toFixed(1),
      fill: "#F37021",
    },
    {
      name: "Available",
      value: stats.roomStats.available,
     //percent: ((stats.roomStats.available / roomTotal) * 100).toFixed(1),
      fill: "#1F8A4C",
    },
  ];

  const permissionData = [
    {
      name: "Approved",
      value: stats.permissionStats.approved,
      //percent: ((stats.permissionStats.approved / permissionTotal) * 100).toFixed(1),
      fill: "#1F8A4C",
    },
    {
      name: "Pending",
      value: stats.permissionStats.pending,
      //percent: ((stats.permissionStats.pending / permissionTotal) * 100).toFixed(1),
      fill: "#F59E0B",
    },
    {
      name: "Rejected",
      value: stats.permissionStats.rejected,
      //percent: ((stats.permissionStats.rejected / permissionTotal) * 100).toFixed(1),
      fill: "#EF4444",
    },
  ];

  const complaintData = [
    { name: "Pending", value: stats.complaintStats.pending },
    { name: "Resolved", value: stats.complaintStats.resolved },
    { name: "Rejected", value: stats.complaintStats.rejected },
  ];

  return (
    <div className="space-y-8">
      {/* Header + Filter */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Admin Analytics Dashboard
        </h1>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value={0}>All Time</option>
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={365}>This Year</option>
        </select>
      </div>

      {/* Donut Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <ChartCard title="Room Occupancy">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roomData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Outing Permissions Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={permissionData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                label={({ percent }) =>
  percent > 0 ? `${(percent * 100).toFixed(0)}%` : ""
}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Complaint Bar */}
      <ChartCard title="Complaint Analytics">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={complaintData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#F37021" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-soft">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      {children}
    </div>
  );
}