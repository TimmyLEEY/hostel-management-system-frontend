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
  Cell,
} from "recharts";
import { Home, AlertTriangle, Clock } from "lucide-react";

const COLORS = {
  cyan: "#22d3ee",
  green: "#22c55e",
  yellow: "#facc15",
  red: "#ef4444",
  indigo: "#6366f1",
};

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] p-6 text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-20 rounded-3xl bg-white/[0.05]" />
          <div className="h-40 rounded-3xl bg-white/[0.05]" />
          <div className="h-40 rounded-3xl bg-white/[0.05]" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-gray-400">
        Error loading data
      </div>
    );
  }

  const roomData = [
    { name: "Occupied", value: stats.roomStats.occupied },
    { name: "Available", value: stats.roomStats.available },
  ];

  const permissionData = [
    { name: "Approved", value: stats.permissionStats.approved },
    { name: "Pending", value: stats.permissionStats.pending },
    { name: "Rejected", value: stats.permissionStats.rejected },
  ];

  const complaintData = [
    { name: "Pending", value: stats.complaintStats.pending },
    { name: "Resolved", value: stats.complaintStats.resolved },
    { name: "Rejected", value: stats.complaintStats.rejected },
  ];

  return (
    <div className="min-h-screen bg-[#030712] px-4 pb-10 pt-24 text-white md:px-8">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-400">
              Real-time hostel performance insights
            </p>
          </div>

          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none backdrop-blur-xl"
          >
            <option value={0}>All Time</option>
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={365}>This Year</option>
          </select>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

          <KpiCard
            title="Occupied Rooms"
            value={stats.roomStats.occupied}
            icon={Home}
            color="text-cyan-400"
          />

          <KpiCard
            title="Available Rooms"
            value={stats.roomStats.available}
            icon={Home}
            color="text-green-400"
          />

          <KpiCard
            title="Pending Requests"
            value={stats.permissionStats.pending}
            icon={Clock}
            color="text-yellow-400"
          />

          <KpiCard
            title="Complaints"
            value={stats.complaintStats.pending}
            icon={AlertTriangle}
            color="text-red-400"
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* ROOM CHART */}
          <ChartCard title="Room Occupancy">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roomData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {roomData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.name === "Occupied"
                          ? COLORS.cyan
                          : COLORS.green
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* PERMISSION CHART */}
          <ChartCard title="Permission Status">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={permissionData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {permissionData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.name === "Approved"
                          ? COLORS.green
                          : entry.name === "Pending"
                          ? COLORS.yellow
                          : COLORS.red
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* BAR CHART */}
        <ChartCard title="Complaint Analytics">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={complaintData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                {complaintData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.name === "Resolved"
                        ? COLORS.green
                        : entry.name === "Pending"
                        ? COLORS.yellow
                        : COLORS.red
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}

/* ===================== KPI CARD ===================== */
function KpiCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl transition hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]">
      <div className="flex items-center justify-between">
        <Icon className={color} size={18} />
        <span className="text-xs text-gray-400">{title}</span>
      </div>

      <p className="mt-3 text-3xl font-bold">{value}</p>

      <div className="mt-3 h-1 w-full rounded-full bg-white/5">
        <div className="h-1 w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
      </div>
    </div>
  );
}

/* ===================== CHART CARD ===================== */
function ChartCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition hover:border-white/20">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <div className="rounded-2xl bg-black/20 p-4">
        {children}
      </div>
    </div>
  );
}